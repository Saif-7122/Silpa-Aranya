# Silpa Aranya 3D Walkthrough: landing page add-on

This adds a "3D Walkthrough" tab to your landing page. The tour is one self-contained web page, so it runs anywhere and nothing needs to be rebuilt.

## What is in this zip

| File | What it is |
|---|---|
| `public/virtual-tour/index.html` | The complete tour: location map with distances, fly-in from Hyderabad, and the 1 BHK, 2 BHK and Manduva walkthroughs. One file, about 400 KB. |
| `components/VirtualTour.tsx` | React component for the new tab. It shows the tour in an iframe with view buttons and a Full screen button. |
| `AI_STUDIO_PROMPT.txt` | The exact text to paste into Google AI Studio. |
| `demo/landing-demo.html` | A plain HTML example of a landing page with the tab, for reference. |

## Steps in Google AI Studio (Build)

1. Open your landing page app in AI Studio.
2. Upload `public/virtual-tour/index.html` and `components/VirtualTour.tsx` (keep the folder names).
3. Paste the text from `AI_STUDIO_PROMPT.txt` and send it.
4. Open the new "3D Walkthrough" tab in the preview and check the tour loads.
5. Deploy as usual.

## If AI Studio will not serve the HTML file

Host the tour on its own and point the tab at it:

1. Go to https://app.netlify.com/drop (free) and drag the `public/virtual-tour` folder onto the page.
2. Netlify gives you a link such as `https://something.netlify.app`.
3. Tell AI Studio: use `<VirtualTour src="https://something.netlify.app/index.html" />`.

Any static host works the same way: GitHub Pages, Firebase Hosting, Cloudflare Pages, or your own web server.

## Linking straight to a view

Add one of these to the end of the tour address:

| Hash | Opens |
|---|---|
| `#map` | Location map and fly-in |
| `#1bhk` | 1 BHK home |
| `#2bhk` | 2 BHK home |
| `#manduva` | Manduva courtyard home |

In the component: `<VirtualTour initialView="manduva" />`.

## Requirements

- The tour loads three.js from `cdn.jsdelivr.net` and fonts from Google Fonts. These must not be blocked.
- WebGL must be available, which is true for current phones and browsers.
- Works best on Chrome, Safari, Edge and Firefox released in the last few years.

## Notes for anyone showing it to buyers

- Artist's impression. Layouts follow the architect's drawings; furniture, finishes, landscaping and the neighbouring farmhouses are indicative.
- Distances are straight-line from the site pin (17.3269° N, 77.9859° E). The proposed RRR line is indicative; the developer states about 1 km, and the final alignment is not yet notified.
- Map data © OpenStreetMap contributors. Elevation: Terrain Tiles (Mapzen, AWS Open Data, SRTM). Keep these credits visible; they are already shown inside the tour.

## Updating the tour later

Replace `public/virtual-tour/index.html` with the new version. Nothing else needs to change.
