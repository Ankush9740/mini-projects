(function (DB) {
  "use strict";

  DB.Levels = [
    {
      id: 1,
      name: "ROCKY WASTELAND",
      subtitle: "DEFEAT THE FRIEZA SCOUTS!",
      width: 2600,
      groundY: 232,
      skyKey: "stage1Sky",
      farKey: "stage1Far",
      midKey: "stage1Mid",
      groundKey: "stage1Ground",
      fgKey: "stage1Fg",
      hasCustomTerrain: true,
      terrain: [
        { x1: 0, x2: 540, y1: 232, y2: 232 },
        { x1: 540, x2: 620, y1: 232, y2: 206 },
        { x1: 620, x2: 940, y1: 206, y2: 206 },
        { x1: 940, x2: 1020, y1: 206, y2: 232 },
        { x1: 1020, x2: 1180, y1: 232, y2: 232 },
        { x1: 1180, x2: 1244, y1: 232, y2: 232, gap: true },
        { x1: 1244, x2: 1440, y1: 224, y2: 224 },
        { x1: 1440, x2: 1504, y1: 224, y2: 224, gap: true },
        { x1: 1504, x2: 1660, y1: 216, y2: 216 },
        { x1: 1660, x2: 1740, y1: 216, y2: 232 },
        { x1: 1740, x2: 2600, y1: 232, y2: 232 },
      ],
      platforms: [
        { x: 245, y: 184, w: 74 },
        { x: 705, y: 156, w: 94 },
        { x: 1176, y: 196, w: 72 },
        { x: 1436, y: 186, w: 74 },
        { x: 1850, y: 180, w: 80 },
        { x: 2430, y: 180, w: 80 },
      ],
      obstacles: [
        { kind: "solid_rock", x: 375, y: 232, w: 38, h: 30, destructible: false },
        { kind: "destructible_rock", x: 655, y: 206, w: 32, h: 30, hp: 35, destructible: true, drop: "ki" },
        { kind: "fallen_log", x: 830, y: 206, w: 48, h: 18, destructible: false },
        { kind: "destructible_rock", x: 1320, y: 224, w: 32, h: 30, hp: 35, destructible: true, drop: "hp" },
        { kind: "solid_rock", x: 1565, y: 216, w: 38, h: 30, destructible: false },
        { kind: "destructible_rock", x: 2030, y: 232, w: 32, h: 30, hp: 40, destructible: true, drop: "ki" },
      ],
      flora: [
        { kind: "tree", x: 55 },
        { kind: "grass", x: 135 },
        { kind: "bush", x: 215 },
        { kind: "grass", x: 330 },
        { kind: "bush", x: 480 },
        { kind: "tree", x: 745 },
        { kind: "grass", x: 910 },
        { kind: "bush", x: 1085 },
        { kind: "grass", x: 1280 },
        { kind: "tree", x: 1620 },
        { kind: "bush", x: 1800 },
        { kind: "grass", x: 1950 },
        { kind: "bush", x: 2290 },
        { kind: "tree", x: 2515 },
      ],
      collectibles: [
        { x: 282, y: 170, kind: "ki" },
        { x: 752, y: 142, kind: "ki" },
        { x: 1473, y: 172, kind: "hp" },
        { x: 1890, y: 166, kind: "ki" },
      ],
      waves: [
        {
          triggerX: 160,
          lockRight: 530,
          spawns: [
            { type: "scout", offset: 340 },
            { type: "scout", offset: 420 },
          ],
        },
        {
          triggerX: 660,
          lockRight: 1120,
          spawns: [
            { type: "scout", offset: 330 },
            { type: "gremlin", offset: 390 },
            { type: "gremlin", offset: 430 },
          ],
        },
        {
          triggerX: 1270,
          lockRight: 1740,
          spawns: [
            { type: "scout", offset: 320 },
            { type: "blaster", offset: 410 },
            { type: "gremlin", offset: 375 },
          ],
        },
        {
          triggerX: 1960,
          lockRight: 2600,
          isBossWave: true,
          spawns: [
            { type: "boss1", offset: 380 },
            { type: "scout", offset: 440 },
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
