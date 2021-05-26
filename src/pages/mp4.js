export default function Mp4() {
  return (
    <div>
      <p>mp4</p>
      <video
        src='https://d2xa88l081gc75.cloudfront.net/preview-videos/videolancer-s-transitions-original-seamless-transitions-pack_by_videolancer.mp4'
        onClick={(e) => e.target.play()}
        // onMouseOver={(e) => e.target.play()}
        onMouseOut={(e) => e.target.pause()}
        muted
        playsInline
        className='cursor-pointer'
      ></video>
    </div>
  );
}

// "https://d2xa88l081gc75.cloudfront.net/preview-thumbnails/app-promo_by_media-stock.jpg"
// "https://d2xa88l081gc75.cloudfront.net/preview-thumbnails/event-promo_by_furyfrog.jpg"
// "https://d2xa88l081gc75.cloudfront.net/preview-thumbnails/fire-logo-reveal_by_rwtemplates.jpg"
// "https://d2xa88l081gc75.cloudfront.net/preview-thumbnails/glitch-handy-transitions_by_videolancer.jpg"
// "https://d2xa88l081gc75.cloudfront.net/preview-thumbnails/glitch-urban-opener_by_afterdarkness75.jpg"
// "https://d2xa88l081gc75.cloudfront.net/preview-thumbnails/graphics-pack_by_motioncan.jpg"
// "https://d2xa88l081gc75.cloudfront.net/preview-thumbnails/minimal-logo-reveal_by_martovsky.jpg"
// "https://d2xa88l081gc75.cloudfront.net/preview-thumbnails/mosaic-logo-opener_by_-miko-.jpg"
// "https://d2xa88l081gc75.cloudfront.net/preview-thumbnails/rtfx-generator-1000-fx-elements-after-effects-pre-rendered-clips_by_rtfx.jpg"
// "https://d2xa88l081gc75.cloudfront.net/preview-thumbnails/sport-shocker-stomp-promo_by_transmaxx.jpg"
// "https://d2xa88l081gc75.cloudfront.net/preview-thumbnails/travel-japan-tradition-opener_by_therightfoot.jpg"
// "https://d2xa88l081gc75.cloudfront.net/preview-thumbnails/videolancer-s-transitions-original-seamless-transitions-pack_by_videolancer.jpg"
