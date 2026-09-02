# GS AGNI — Master Gallery Image Collection (15 Centralized Assets)
# Location: assets/gallery/ — SINGLE SOURCE, no duplicates

All 15 images are the MASTER COLLECTION from Projects/Gallery, reused intelligently across all 10 pages. Verified via inspection of visual content.

| # | File | Visual Content | Used On |
|---|------|----------------|---------|
| 01 | gallery-01-alarm-panel.jpg | Fire alarm control panel closeup | Fire Alarm Systems (hero, panels), Home hero |
| 02 | gallery-02-extinguishers.jpg | Fire extinguishers collection | Fire Extinguishers (ABC, hero), Home extinguishers |
| 03 | gallery-03-smoke-detector.jpg | Smoke detector ceiling closeup | Fire Detection (smoke detectors), Maintenance detector testing |
| 04 | gallery-04-hydrant.jpg | Fire hydrant / industrial fire protection | Fire Protection Equipment (hydrant/hose), Home hero, Industries |
| 05 | gallery-05-maintenance.jpg | Maintenance technician inspecting alarm | Fire Alarm Maintenance, Maintenance page, Fire Detection inspection |
| 06 | gallery-06-commercial.jpg | Commercial building fire protection | Industries (commercial), Home hero, About commercial |
| 07 | gallery-07-industrial.jpg | Industrial facility / engineer | Industries (factory/warehouse), Projects industrial |
| 08 | gallery-08-mcp-hooter.jpg | MCP manual call point / hooter | Fire Detection (MCP, hooters), Fire Alarm (MCP sounder) |
| 09 | gallery-09-detection.jpg | Heat detector / detection devices | Fire Detection (heat detectors), Fire Alarm detection devices |
| 10 | gallery-10-gs-agni-corridor.jpg | GS AGNI Notifier panel + MCP + strobe corridor (1.jpeg) | Hero ALL pages (actual business equipment), About, Projects actual, Contact |
| 11 | gallery-11-gs-agni-training.jpg | GS AGNI extinguisher training person suit spraying (2.jpeg) | Hero Fire Extinguishers/Maintenance, Gallery actual service, Commercial |
| 12 | gallery-12-gs-agni-wall.jpg | GS AGNI complete alarm wall panel+strobe+pull station (3.jpeg) | Fire Alarm Panels card, Gallery actual system |
| 13 | gallery-13-gs-agni-pump.jpg | GS AGNI Electric Fire Pump Controller red cabinet (4.jpeg) | Hero Fire Protection Equipment, Pump cards, Gallery actual |
| 14 | gallery-14-gs-agni-facilities.png | GS AGNI Facilities Protected Banner Office/Factory/Warehouses/Apartments (5.png) | Home trust, About, Industries, Projects actual business banner |
| 15 | gallery-15-gs-agni-single.jpg | GS AGNI single red fire extinguisher portable (6.jpeg) | Fire Extinguishers ABC, Gallery actual product, Equipment |

Rules Enforced:
- Gallery images are PRIMARY — every major section uses Gallery image per visual content (alarm→alarm, extinguisher→extinguisher, detector→detector, pump→pump)
- Supporting stock only where Gallery genuinely lacks subject (e.g., hospital/hotel/residential are relevant supporting but marked as such)
- Hero slideshow uses BEST Gallery images, 3s auto-change `main.js:40`, `object-fit:cover` `style.css:89`, equipment `contain` where full object needed `style.css:153`
- Centralized at `assets/gallery/` — no duplicate copies, all pages reference same 15 assets via `assets/gallery/` (`../assets/gallery/` for subfolders)
- All 6 new 1.jpeg–6.jpeg are part of master (10–15) and used per content inspection, not filename
