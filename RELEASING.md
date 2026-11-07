# justFlipIt selbst veröffentlichen

Du brauchst Schreibzugriff auf [SimHub/justFlipIt](https://github.com/SimHub/justFlipIt), Veröffentlichungsrechte für [@simhub2/justflipit](https://www.npmjs.com/package/@simhub2/justflipit) und Node.js 22 oder neuer. Führe die Befehle im Repository aus.

## Änderungen auf GitHub bringen

Starte einen neuen Arbeitsbranch auf dem aktuellen `main`, bevor du die Dateien änderst.

```sh
git switch main
git pull --ff-only
git switch -c fix/meine-aenderung
```

Prüfe die aktuell veröffentlichte Version mit `npm view @simhub2/justflipit version`. Erhöhe für einen Fix die Patch-Version mit `npm version patch --no-git-tag-version`. Für neue abwärtskompatible Funktionen verwende `minor`, für inkompatible Änderungen `major`. Der Befehl aktualisiert `package.json` und `package-lock.json`. Ergänze den Changelog und aktualisiere bei Bedarf die fest eingetragene CDN-Version in der README.

```sh
npm ci
npm run check
npm pack --dry-run
git status --short
git add -p
git diff --cached
git commit -m "Beschreibe die Änderung"
git push -u origin HEAD
```

`git add -p` lässt dich Änderungen an bereits verfolgten Dateien auswählen. Füge neue Dateien bei Bedarf mit `git add <datei>` hinzu, bevor du committest. Erstelle auf GitHub einen Pull Request nach `main`. Merge ihn, sobald die CI erfolgreich ist.

## Das npm-Paket manuell veröffentlichen

Wechsle auf den gemergten Stand und prüfe die Paketvorschau. Der Publish-Befehl startet den Build, die Tests und die Typprüfung über `prepublishOnly`.

```sh
git switch main
git pull --ff-only
npm ci
npm run build
npm pack --dry-run
npm whoami
npm publish --access public
```

Falls `npm whoami` fehlschlägt, führe `npm login` aus und schließe die Anmeldung im Browser ab. Bestätige auch die separate Upload-Freigabe, falls npm sie beim Publish verlangt.

Prüfe nach dem Upload mit `npm view @simhub2/justflipit version --prefer-online`, ob deine Version öffentlich sichtbar ist. Die Registry kann nach einem erfolgreichen Upload kurz brauchen. Warte in diesem Fall auf die Verarbeitung, bevor du es erneut prüfst.

Wenn die Version sichtbar ist, markiere den gemergten Commit in Git. Ersetze `4.0.1` durch die Version aus deiner `package.json`.

```sh
git tag -a v4.0.1 -m "justFlipIt 4.0.1"
git push origin v4.0.1
```

Ein Git-Tag allein startet den npm-Workflow nicht.

## Optional über GitHub Actions veröffentlichen

Richte zuerst npm Trusted Publishing für dieses Repository und `publish.yml` sowie die GitHub-Umgebung `npm` ein. Erstelle dann einen GitHub Release mit dem Versions-Tag für den gemergten Commit. Der Workflow prüft die Version, testet das Paket und veröffentlicht es mit Provenance. Wähle für jede Version entweder den manuellen Upload oder den GitHub-Workflow. Eine npm-Version kann nur einmal veröffentlicht werden.
