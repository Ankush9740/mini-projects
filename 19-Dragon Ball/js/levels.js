(function (DB) {
  "use strict";

  DB.Levels = [
    {
      id: 1,
      name: "ROCKY WASTELAND",
      subtitle: "DEFEAT THE FRIEZA SCOUTS!",
      width: 2100,
      groundY: 232,
      skyKey: "stage1Sky",
      midKey: "stage1Mid",
      groundKey: "stage1Ground",
      waves: [
        {
          triggerX: 160,
          lockRight: 520,
          spawns: [
            { type: "scout", offset: 360 },
            { type: "scout", offset: 420 },
          ],
        },
        {
          triggerX: 680,
          lockRight: 1080,
          spawns: [
            { type: "scout", offset: 360 },
            { type: "gremlin", offset: 410 },
            { type: "gremlin", offset: 450 },
          ],
        },
        {
          triggerX: 1220,
          lockRight: 1620,
          spawns: [
            { type: "scout", offset: 350 },
            { type: "blaster", offset: 420 },
            { type: "gremlin", offset: 390 },
          ],
        },
        {
          triggerX: 1700,
          lockRight: 2100,
          isBossWave: true,
          spawns: [
            { type: "boss1", offset: 370 },
            { type: "scout", offset: 430 },
          ],
        },
      ],
    },
    {
      id: 2,
      name: "MOUNTAIN BATTLEFIELD",
      subtitle: "BREAK THROUGH THE ELITE SQUAD!",
      width: 2300,
      groundY: 232,
      skyKey: "stage2Sky",
      midKey: "stage2Mid",
      groundKey: "stage2Ground",
      waves: [
        {
          triggerX: 180,
          lockRight: 560,
          spawns: [
            { type: "scout", offset: 350 },
            { type: "gremlin", offset: 390 },
            { type: "blaster", offset: 440 },
          ],
        },
        {
          triggerX: 760,
          lockRight: 1180,
          spawns: [
            { type: "brute", offset: 370 },
            { type: "gremlin", offset: 410 },
            { type: "gremlin", offset: 450 },
          ],
        },
        {
          triggerX: 1360,
          lockRight: 1780,
          spawns: [
            { type: "brute", offset: 360 },
            { type: "blaster", offset: 420 },
            { type: "scout", offset: 390 },
            { type: "blaster", offset: 460 },
          ],
        },
        {
          triggerX: 1860,
          lockRight: 2300,
          isBossWave: true,
          spawns: [
            { type: "boss2", offset: 380 },
            { type: "gremlin", offset: 430 },
          ],
        },
      ],
    },
    {
      id: 3,
      name: "ALIEN BATTLEFIELD",
      subtitle: "FIGHT ACROSS THE TWIN-SUN PLANET!",
      width: 2450,
      groundY: 232,
      skyKey: "stage3Sky",
      midKey: "stage3Mid",
      groundKey: "stage3Ground",
      waves: [
        {
          triggerX: 180,
          lockRight: 580,
          spawns: [
            { type: "gremlin", offset: 340 },
            { type: "gremlin", offset: 380 },
            { type: "blaster", offset: 430 },
            { type: "blaster", offset: 460 },
          ],
        },
        {
          triggerX: 800,
          lockRight: 1240,
          spawns: [
            { type: "brute", offset: 360 },
            { type: "brute", offset: 420 },
            { type: "blaster", offset: 455 },
          ],
        },
        {
          triggerX: 1440,
          lockRight: 1880,
          spawns: [
            { type: "scout", offset: 330 },
            { type: "gremlin", offset: 370 },
            { type: "brute", offset: 410 },
            { type: "blaster", offset: 450 },
          ],
        },
        {
          triggerX: 1980,
          lockRight: 2450,
          isBossWave: true,
          spawns: [
            { type: "boss3", offset: 380 },
            { type: "blaster", offset: 440 },
          ],
        },
      ],
    },
    {
      id: 4,
      name: "FINAL SHOWDOWN",
      subtitle: "CONFRONT EMPEROR FROST!",
      width: 2200,
      groundY: 232,
      skyKey: "stage4Sky",
      midKey: "stage4Mid",
      groundKey: "stage4Ground",
      waves: [
        {
          triggerX: 180,
          lockRight: 580,
          spawns: [
            { type: "brute", offset: 360 },
            { type: "blaster", offset: 415 },
            { type: "gremlin", offset: 445 },
          ],
        },
        {
          triggerX: 840,
          lockRight: 1280,
          spawns: [
            { type: "brute", offset: 350 },
            { type: "blaster", offset: 400 },
            { type: "blaster", offset: 440 },
            { type: "gremlin", offset: 375 },
          ],
        },
        {
          triggerX: 1680,
          lockRight: 2200,
          isBossWave: true,
          spawns: [{ type: "boss4", offset: 380 }],
        },
      ],
    },
  ];
})(window.DB = window.DB || {});
