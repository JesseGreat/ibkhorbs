/* =====================================================================
   Turns a public Instagram / TikTok post URL into its official iframe
   embed URL. Pure — safe to use from both server and client components.

   Handles /p/, /reel/, /reels/, /tv/, profile-prefixed URLs, and strips
   query strings (including Instagram's ?stkn= share tokens), so URLs can
   be pasted straight from the share sheet.

   Shortened links (vm.tiktok.com/…, instagr.am/…) are rejected — they
   need an HTTP redirect to resolve, which can't be done at build time.
   ===================================================================== */

export type ParsedPost =
  | { network: "Instagram" | "TikTok"; src: string }
  | { network: null; src: null };

export function parsePostUrl(url: string): ParsedPost {
  const instagram = url.match(
    /instagram\.com\/(?:[^/]+\/)?(p|reel|reels|tv)\/([A-Za-z0-9_-]+)/,
  );
  if (instagram) {
    // `reels` (plural) is not a valid embed path — normalise it.
    const kind = instagram[1] === "reels" ? "reel" : instagram[1];
    return {
      network: "Instagram",
      src: `https://www.instagram.com/${kind}/${instagram[2]}/embed`,
    };
  }

  const tiktok = url.match(/tiktok\.com\/@[^/]+\/video\/(\d+)/);
  if (tiktok) {
    return { network: "TikTok", src: `https://www.tiktok.com/embed/v2/${tiktok[1]}` };
  }

  return { network: null, src: null };
}
