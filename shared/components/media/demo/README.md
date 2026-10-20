# DemoVideo: asset contract

`DemoVideo` plays a recorded demo as a looping, muted, chaptered clip in the site's theme. Demos are shot with tape, then rendered to video once per theme. This is what a shooter hands over.

## Files

One folder per demo, in the landing app's `public/`:

```
landing/public/demos/<demo>/
  light.mp4         h264, the Dawn take
  light.webm        vp9, the Dawn take
  dark.mp4          h264, the Dusk take
  dark.webm         vp9, the Dusk take
  poster-light.jpg  first frame of light.mp4
  poster-dark.jpg   first frame of dark.mp4
  chapters.json     chapters and label
  preview-light.mp4   h264, the preview loop, Dawn
  preview-light.webm  vp9, the same
  preview-dark.mp4    h264, the preview loop, Dusk
  preview-dark.webm   vp9, the same
  thumb-light.jpg     480x300 still, the loop's first frame, Dawn
  thumb-dark.jpg      the same, Dusk
```

`<demo>` is a short kebab id, the same one the page uses: `hero`, `movies`, `agents`, `memes`, `training`. Used as `<DemoVideo src="/demos/hero" />`.

## Video

- **Frame**: 16:10, 2560x1600 (a 1280x800 page captured at device scale 2). Same size for every demo. These are UI screencasts with small text and thin lines: 2x is one video pixel per screen pixel on a retina laptop, and keeps one chroma sample per css px under yuv420, so coloured text stays sharp.
- **Both themes are one take**: light and dark come from the same tape recording, so they match frame for frame and run the same length (within one frame). A theme flip keeps the playhead, so any drift shows.
- **No audio track** (`-an`). Constant 30 fps.
- **Loop**: the player crossfades the last ~0.3s into the first frame, so the end need not match the start. Do not pad the end with frozen frames.
- **Size**: quality first, text must stay crisp. Expect roughly 4-10 MB per file per minute (vp9 smaller than h264). Never lower the frame size or drop below the crf values below to save bytes; the 3 MB/min files this replaced blurred text and lost chart grid lines.
- **Colour**: bt709, tagged (`-colorspace bt709 -color_primaries bt709 -color_trc bt709`), so browsers don't guess the matrix.
- **Posters**: the clip's first frame, jpg, quality ~85, same size as the clip. They show before the clip loads and stay under reduced motion.

```bash
# from a lossless master per theme (master-light.mov, master-dark.mov), 2560x1600
# (brand/demos/tools/render.mjs does this from tape-render's frames)
C="-colorspace bt709 -color_primaries bt709 -color_trc bt709 -color_range tv"
for t in light dark; do
  ffmpeg -i master-$t.mov -an -r 30 -vf scale=out_color_matrix=bt709:out_range=tv,format=yuv420p \
    -c:v libx264 -profile:v high -preset slow -tune animation -crf 22 \
    -g 60 $C -movflags +faststart $t.mp4
  ffmpeg -i master-$t.mov -an -r 30 -vf scale=out_color_matrix=bt709:out_range=tv,format=yuv420p \
    -c:v libvpx-vp9 -crf 28 -b:v 0 -deadline good -cpu-used 2 -row-mt 1 -tile-columns 2 \
    -auto-alt-ref 1 -lag-in-frames 25 -g 60 $C $t.webm
  ffmpeg -i $t.mp4 -frames:v 1 -q:v 3 poster-$t.jpg
done
```

`+faststart` puts the index first so playback starts before the file is in. A keyframe every 2s keeps chapter jumps snappy; every 1s nearly doubles the size of a mostly still screen. Do not use vp9 `-deadline realtime` for finals: it spends bits badly on text and ghosts old frames into flat areas.

## Preview loop and thumb

For small tiles (a gallery, an index of demos) where the UI text can't be read anyway: a short loop and a still, cut for motion and weight, not detail. `DemoVideo` does not use them.

- **Cut**: 8s from the take, a stretch with motion that reads small (things landing, curves drawing, a wall of posters). Where per demo is `PREVIEWS` in `brand/demos/tools/render.mjs`.
- **Loop**: 640x400, 30 fps, no audio, bt709 tagged. h264 crf 28 and vp9 crf 38. Roughly 80-220 KB a file. Plain loop, no crossfade.
- **Thumb**: 480x300 jpg q 4, the loop's first frame taken from the full take, roughly 10-20 KB.
- A player for them should load the loop only when it is in view and the page's main clip is in, play it while seen, and hold the thumb under reduced motion or save data.

`render.mjs` cuts both from the final mp4 on every render; `node tools/render.mjs <demo> --format preview` cuts them alone from what is in `out/`. `publish.mjs` copies them with the rest when present.

## chapters.json

```json
{
  "label": "A nuspace space built from zero: a table, a slider, live totals and a chart.",
  "duration": 64.2,
  "chapters": [
    { "t": 0, "title": "Start a plane", "note": "An empty page. Name it, give it an icon." },
    { "t": 10, "title": "Add a table", "note": "Type / for cells. A heading, then three books." }
  ]
}
```

- `t`: chapter start, **seconds** from the top of the clip, decimals fine. The first is 0. Each runs to the next one, the last to the end.
- `title`: a few words. Bold at the start of the caption, and the chapter's tooltip on the bar.
- `note`: optional, one line after the title in the caption.
- `duration`: optional, the clip length in seconds, so the bar lays out before the video loads. The video's own length wins once known.

Captions follow chapters, as in the tape player: one per chapter, shown while it plays, read as `01/05 Title note`. There is no separate caption timing.
- `label`: what the clip shows, for screen readers.

Tape chapters are in milliseconds: divide by 1000, and shift them if the render trims the head of the take.

## Player behavior

- Loads only within ~600px of the viewport (`eager` for the hero), plays only while on screen and the tab is visible.
- Picks `webm` where the browser is sure of vp9, `mp4` everywhere else.
- Follows the site theme. On a flip the other theme loads at the same moment and crossfades in.
- Reduced motion or save data: no autoplay, the poster holds until play is pressed.
- On the frame, like the tape player: the caption low in the middle, a bar along the bottom edge cut into chapters, each as long as it plays.
- Press a point on the bar to play from there; Tab to a chapter and Enter plays from its start. A jump glides the fill.
- Click the frame to pause or play (Space or Enter when focused, `k` anywhere in it). No other controls.

