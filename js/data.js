/*
  KANGAROO CUP: results & rankings data
  --------------------------------------
  Edit this file to fill in results as you get them. That's it. No
  database, no backend. Save the file and refresh the site.

  Each edition has:
    year      - number
    dates     - text, e.g. "28-30 Nov 2025" (leave "" if unknown/TBD)
    host      - venue text
    champion  - winner's name for the History page (leave "" if unknown)
    rankings  - an array of rows, ONE PER PLAYER, ordered 1st to last.
                Each row is { rank, name }.
                - rank: the finishing position (1 = winner). Leave as the
                  number already there, or set to null to show "-".
                - name: player name. Leave "" to show a blank/TBD row.

  To add/remove players for a year, add/remove rows in that year's
  "rankings" array. To add a brand new past edition, copy one of the
  blocks below and change the year.
*/

const HOST_ADDRESS = "1 Bantry Court, Kallaroo WA 6025";

const KANGAROO_CUP = {
  editions: [
    {
      year: 2026,
      dates: "15-18 Oct 2026",
      host: HOST_ADDRESS,
      champion: "",
      // Not yet played (15-18 Oct 2026), so ranking is left blank on purpose.
      rankings: blankRankings(7)
    },
    {
      year: 2025,
      dates: "28-30 Nov 2025",
      host: HOST_ADDRESS,
      champion: "Humberto van den Brok",
      // Roster confirmed from the 2025 program. Winner filled in, the
      // rest of the finishing order still to come.
      rankings: [
        { rank: 1, name: "Humberto van den Brok" },
        { rank: null, name: "Mack" },
        { rank: null, name: "Bavo" },
        { rank: null, name: "Olaf K" },
        { rank: null, name: "Olaf B" },
        { rank: null, name: "Alex" },
        { rank: null, name: "Flip" },
        { rank: null, name: "Hibbes" }
      ]
    },
    {
      year: 2024,
      dates: "5-8 Dec 2024",
      host: HOST_ADDRESS,
      champion: "Olaf Bluemke",
      // Ranks 1, 2, 7 and 8 confirmed. Hibbes and Alex also played but
      // their finishing position isn't known; two spots still unnamed.
      rankings: [
        { rank: 1, name: "Olaf Bluemke" },
        { rank: 2, name: "Humberto van den Brok" },
        { rank: null, name: "Hibbes" },
        { rank: null, name: "Alex" },
        { rank: null, name: "" },
        { rank: null, name: "" },
        { rank: 7, name: "Olaf K" },
        { rank: 8, name: "Flip" }
      ]
    },
    {
      year: 2023,
      dates: "23-26 Nov 2023",
      host: HOST_ADDRESS,
      champion: "Olaf Kwakman",
      // Roster confirmed from the 2023 program. Winner filled in, the
      // rest of the finishing order still to come.
      rankings: [
        { rank: 1, name: "Olaf Kwakman" },
        { rank: null, name: "Alex" },
        { rank: null, name: "Toekan" },
        { rank: null, name: "Hibbes" },
        { rank: null, name: "Robbie" },
        { rank: null, name: "Olaf B" },
        { rank: null, name: "Eege" },
        { rank: null, name: "Flip" }
      ]
    },
    {
      year: 2022,
      dates: "21-24 Apr 2022",
      host: HOST_ADDRESS,
      champion: "Jan-Eege Klop",
      // Winner confirmed. Floor, Olaf B, Flip, Alex and Olaf K also
      // played but their finishing order isn't known; two spots still
      // unnamed.
      rankings: [
        { rank: 1, name: "Jan-Eege Klop" },
        { rank: null, name: "Floor" },
        { rank: null, name: "Olaf B" },
        { rank: null, name: "Flip" },
        { rank: null, name: "Alex" },
        { rank: null, name: "Olaf K" },
        { rank: null, name: "" },
        { rank: null, name: "" }
      ]
    }
  ]
};

// Generates N empty placeholder rows, ranked 1..N.
function blankRankings(n) {
  const rows = [];
  for (let i = 1; i <= n; i++) {
    rows.push({ rank: i, name: "" });
  }
  return rows;
}

// Rank 1 filled in with the known winner, rest left blank for later.
function winnerPlusBlank(winnerName, totalPlayers) {
  const rows = [{ rank: 1, name: winnerName }];
  for (let i = 2; i <= totalPlayers; i++) {
    rows.push({ rank: null, name: "" });
  }
  return rows;
}
