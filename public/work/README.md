Drop portfolio media here, one folder per category:

  public/work/weddings/     public/work/commercials/     public/work/travel/

Then reference them in src/content/work.ts:

  poster: "/work/weddings/tolu-and-david.jpg"
  video:  "/work/weddings/tolu-and-david.mp4"

Posters: JPG/WebP, ~2000px on the long edge, under 400 KB.
Videos:  H.264 MP4, 1080p, under 20 MB. Compress with:
  ffmpeg -i in.mov -vcodec libx264 -crf 26 -preset slow -vf scale=-2:1080 -an out.mp4
