/* ----------------------------------------------------------------- - */
/*  Graphics report – HTML snippet                                   */
/*  ▸ is injected into currentTask.description when a task is created via board.js */
/*    if the board has been recognized as a graphics report.    */
/* ------------------------------------------------------------------ */
(function () {

    /* ---------- help selects ------------------------------------ */
    const yesNoSelect = `
        <select class="rapport_select">
            <option value="" selected>-</option>
            <option>Ja</option>
            <option>Nein</option>
        </select>`;

    const goodBadSelect = `
        <select class="rapport_select">
            <option value="" selected>-</option>
            <option>Gut</option>
            <option>Schlecht</option>
        </select>`;

    const deliverySelect = `
        <select class="rapport_select">
            <option value="" selected>-</option>
            <option>vollst. / pünktlich</option>
            <option>vollst. / spät</option>
            <option>unvollst. / pünktlich</option>
            <option>unvollst. / spät</option>
        </select>`;

    const designerSelect = `
        <select class="rapport_select">
            <option value="" selected>-</option>
            <option>Leo Rullani</option>
            <option>Mike Gsteiger</option>
            <option>Robine Appenzeller</option>
            <option>Ophelia Maier</option>
        </select>`;

    /* ------------------------------------------------------------------ */
    /*  Haupt‑HTML                                                       */
    /* ------------------------------------------------------------------ */
    const GRAPHICS_RAPPORT_FORM_HTML = /*html*/`
<table class="rapport_tbl">
  <thead>
    <tr><th colspan="3"><h2>GFX‑RAPPORT</h2></th></tr>
  </thead>
  <tbody>
    <!-- Grunddaten -------------------------------------------------- -->
    <tr><td>Spiel</td>
        <td contenteditable="true" data-placeholder="WIN – YB"></td></tr>

    <tr><td>Datum</td>
        <td style="display:flex;align-items:center;gap:6px">
            <!-- ► gelbes Icon + Click öffnet Date‑Picker                -->
            <img src="../../assets/icons/calendar_month.svg"
                 alt="Kalender"
                 style="height:20px;width:20px;cursor:pointer"
                 onclick="this.nextElementSibling.showPicker()">
            <!-- ► native Icon wird via CSS ausgeblendet                -->
            <input type="date"
                   class="rapport_date_input"
                   style="flex:1">
        </td>
    </tr>

    <tr><td>Grafiker/in</td><td>${designerSelect}</td></tr>

    <tr><td>Regie</td>
        <td>
          <select class="rapport_select">
            <option value="" selected>-</option>
            <option>A</option>
            <option>B</option>
          </select>
        </td></tr>

    <!-- 1. Kommunikation -------------------------------------------- -->
    <tr class="rapport_section"><th colspan="2">1.&nbsp;Kommunikation</th></tr>
    <tr><td>AL</td><td>${goodBadSelect}</td></tr>
    <tr><td>VAR / 4.OS</td><td>${goodBadSelect}</td></tr>
    <tr><td>MCR / Tech.</td><td>${goodBadSelect}</td></tr>
    <tr><td>Regie</td><td>${goodBadSelect}</td></tr>

    <!-- 2. Infos vor Kickoff ---------------------------------------- -->
    <tr class="rapport_section"><th colspan="2">2.&nbsp;Infos vor Kickoff</th></tr>
    <tr><td>Opta‑Daten</td><td>${deliverySelect}</td></tr>
    <tr><td>Matchblatt</td><td>${deliverySelect}</td></tr>
    <tr><td>Form./Taktik</td><td>${deliverySelect}</td></tr>

    <!-- 3. Vortest --------------------------------------------------- -->
    <tr class="rapport_section"><th colspan="2">3.&nbsp;Grafik‑Vortest</th></tr>
    <tr><td>Grafiktest OK?</td><td>${yesNoSelect}</td></tr>

    <!-- 4. Matchgrafiken -------------------------------------------- -->
    <tr class="rapport_section"><th colspan="2">4.&nbsp;Matchgrafiken</th></tr>
    <tr>
      <td><img class="icon-goal" src="../../assets/icons/soccerball2.png" alt=""> Tore H</td>
      <td contenteditable="true" data-placeholder="#16 1:1"></td>
    </tr>
    <tr>
      <td><img class="icon-yc" src="../../assets/icons/yellow-card.png" alt=""> Gelb H</td>
      <td contenteditable="true" data-placeholder="-"></td>
    </tr>
    <tr>
      <td><img class="icon-rc" src="../../assets/icons/red-card.png" alt=""> Rot H</td>
      <td contenteditable="true" data-placeholder="-"></td>
    </tr>
    <tr>
      <td><img class="icon-goal" src="../../assets/icons/soccerball2.png" alt=""> Tore G</td>
      <td contenteditable="true" data-placeholder="#6 0:1"></td>
    </tr>
    <tr>
      <td><img class="icon-yc" src="../../assets/icons/yellow-card.png" alt=""> Gelb G</td>
      <td contenteditable="true" data-placeholder="-"></td>
    </tr>
    <tr>
      <td><img class="icon-rc" src="../../assets/icons/red-card.png" alt=""> Rot G</td>
      <td contenteditable="true" data-placeholder="-"></td>
    </tr>

    <!-- 5. PlayerPics ----------------------------------------------- -->
    <tr class="rapport_section"><th colspan="2">5.&nbsp;PlayerPics</th></tr>
    <tr><td>Heim vollständig?</td><td>${yesNoSelect}</td></tr>
    <tr><td>Gast vollständig?</td><td>${yesNoSelect}</td></tr>

    <!-- 6. Probleme -------------------------------------------------- -->
    <tr class="rapport_section"><th colspan="2">6.&nbsp;Probleme</th></tr>
    <tr><td colspan="2">
        <textarea class="rapport_textarea"
                  placeholder="Details und sonstige Auffälligkeiten…"
                  style="width:100%;min-height:80px;"></textarea>
    </td></tr>

    <!-- 7. Diskrepanzen --------------------------------------------- -->
    <tr class="rapport_section"><th colspan="2">7.&nbsp;Aufstellungs‑Diskrepanzen</th></tr>
    <tr><td>Abweichungen?</td><td>${yesNoSelect}</td></tr>
    <tr><td colspan="2">
        <textarea class="rapport_textarea"
                  placeholder="sfl.ch 4‑3‑3; Blue on‑air 4‑4‑2"
                  style="width:100%;min-height:60px;"></textarea>
    </td></tr>
  </tbody>
</table>`;

    /* -------------------------------------------------------------- */
    /*  global provision                           */
    /* -------------------------------------------------------------- */
    if (typeof window !== 'undefined') {
        window.GRAPHICS_RAPPORT_FORM_HTML = GRAPHICS_RAPPORT_FORM_HTML;
    }
})();