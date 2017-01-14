var cards = require("../lib/cards.json");
var enums = require("../lib/enums.json");

console.log(enums.GameTag);

{ ADDITIONAL_PLAY_REQS_1: 515,
  ADDITIONAL_PLAY_REQS_2: 516,
  ADJACENT_BUFF: 350,
  AFFECTED_BY_SPELL_POWER: 370,
  AI_MUST_PLAY: 367,
  AI_ONE_SHOT_KILL: 400,
  ALL_TARGETS_RANDOM: 477,
  APPEAR_FUNCTIONALLY_DEAD: 426,
  ARMOR: 292,
  ARMS_DEALING: 458,
  ARTISTNAME: 342,
  ATK: 47,
  ATTACHED: 40,
  ATTACKING: 38,
  AURA: 362,
  AUTOATTACK: 457,
  AttackVisualType: 251,
  BATTLECRY: 218,
  BURNING: 392,
  CANNOT_ATTACK_HEROES: 413,
  CANT_ATTACK: 227,
  CANT_BE_ATTACKED: 245,
  CANT_BE_DAMAGED: 240,
  CANT_BE_DESTROYED: 247,
  CANT_BE_DISPELLED: 314,
  CANT_BE_EXHAUSTED: 244,
  CANT_BE_FATIGUED: 456,
  CANT_BE_FROZEN: 264,
  CANT_BE_HEALED: 239,
  CANT_BE_READIED: 243,
  CANT_BE_REMOVED_FROM_GAME: 242,
  CANT_BE_SET_ASIDE: 241,
  CANT_BE_SILENCED: 314,
  CANT_BE_SUMMONING_SICK: 253,
  CANT_BE_TARGETED: 246,
  CANT_BE_TARGETED_BY_ABILITIES: 311,
  CANT_BE_TARGETED_BY_BATTLECRIES: 379,
  CANT_BE_TARGETED_BY_HERO_POWERS: 332,
  CANT_BE_TARGETED_BY_OPPONENTS: 270,
  CANT_BE_TARGETED_BY_SPELLS: 311,
  CANT_DAMAGE: 222,
  CANT_DESTROY: 229,
  CANT_DISCARD: 230,
  CANT_DRAW: 232,
  CANT_EXHAUST: 226,
  CANT_HEAL: 221,
  CANT_PLAY: 231,
  CANT_READY: 225,
  CANT_REMOVE_FROM_GAME: 224,
  CANT_SET_ASIDE: 223,
  CANT_TARGET: 228,
  CAN_SUMMON_MAXPLUSONE_MINION: 390,
  CARDNAME: 185,
  CARDRACE: 200,
  CARDTEXT_INHAND: 184,
  CARDTYPE: 202,
  CARD_COSTS_HEALTH: 481,
  CARD_ID: 186,
  CARD_SET: 183,
  CARD_TARGET: 267,
  CAST_RANDOM_SPELLS: 437,
  CHARGE: 197,
  CHARGE_READY: 308,
  CHOOSE_BOTH: 419,
  CHOOSE_ONE: 443,
  CLASS: 199,
  COLLECTIBLE: 321,
  COMBO: 220,
  COMBO_ACTIVE: 266,
  CONTROLLER: 50,
  COPY_DEATHRATTLE: 55,
  COPY_DEATHRATTLE_INDEX: 56,
  COST: 48,
  COUNTER: 340,
  CREATOR: 313,
  CTHUN: 436,
  CURRENT_HEROPOWER_DAMAGE_BONUS: 395,
  CURRENT_PLAYER: 23,
  CURRENT_SPELLPOWER: 291,
  CUSTOM_KEYWORD_EFFECT: 376,
  CardTextInPlay: 252,
  DAMAGE: 44,
  DEATHRATTLE: 217,
  DEATHRATTLE_RETURN_ZONE: 382,
  DEATHRATTLE_SENDS_BACK_TO_DECK: 382,
  DEATH_RATTLE: 217,
  DEFENDING: 36,
  DEFINING_ENCHANTMENT: 469,
  DEFINITION: 52,
  DISCOVER: 415,
  DISPLAYED_CREATOR: 385,
  DIVINE_SHIELD: 194,
  DIVINE_SHIELD_READY: 314,
  DONT_SHOW_IMMUNE: 422,
  DURABILITY: 187,
  DevState: 268,
  ELECTRIC_CHARGE_LEVEL: 420,
  ELITE: 114,
  EMBRACE_THE_SHADOW: 442,
  ENCHANTMENT_BIRTH_VISUAL: 330,
  ENCHANTMENT_IDLE_VISUAL: 331,
  ENRAGED: 212,
  ENTITY_ID: 53,
  EVIL_GLOW: 401,
  EXHAUSTED: 43,
  EXTRA_ATTACKS_THIS_TURN: 444,
  EXTRA_DEATHRATTLES: 371,
  FACTION: 201,
  FATIGUE: 22,
  FINISH_ATTACK_SPELL_ON_DAMAGE: 470,
  FIRST_CARD_PLAYED_THIS_TURN: 304,
  FIRST_PLAYER: 24,
  FLAVORTEXT: 351,
  FORCED_PLAY: 352,
  FORGETFUL: 389,
  FREEZE: 208,
  FROZEN: 260,
  GOLD_REWARD_STATE: 13,
  GRIMY_GOONS: 482,
  GrantCharge: 355,
  HAND_REVEALED: 348,
  HEALING_DOUBLE: 357,
  HEALTH: 45,
  HEALTH_MINIMUM: 337,
  HEAVILY_ARMORED: 421,
  HEROPOWER_ACTIVATIONS_THIS_TURN: 406,
  HEROPOWER_ADDITIONAL_ACTIVATIONS: 405,
  HEROPOWER_DAMAGE: 396,
  HERO_ENTITY: 27,
  HERO_POWER: 380,
  HERO_POWER_DOUBLE: 366,
  HIDE_COST: 402,
  HIDE_STATS: 402,
  HISTORY_PROXY: 54,
  HISTORY_PROXY_NO_BIG_CARD: 432,
  HOW_TO_EARN: 364,
  HOW_TO_EARN_GOLDEN: 365,
  HealTarget: 361,
  IGNORE_DAMAGE: 1,
  IGNORE_DAMAGE_OFF: 354,
  IMMUNE: 240,
  IMMUNE_WHILE_ATTACKING: 373,
  INCOMING_ABILITY_DAMAGE_ADJUSTMENT: 279,
  INCOMING_ABILITY_DAMAGE_CAP: 286,
  INCOMING_ABILITY_DAMAGE_MULTIPLIER: 285,
  INCOMING_COMBAT_DAMAGE_ADJUSTMENT: 280,
  INCOMING_COMBAT_DAMAGE_CAP: 290,
  INCOMING_COMBAT_DAMAGE_MULTIPLIER: 289,
  INCOMING_DAMAGE_ADJUSTMENT: 237,
  INCOMING_DAMAGE_CAP: 238,
  INCOMING_DAMAGE_MULTIPLIER: 236,
  INCOMING_HEALING_ADJUSTMENT: 234,
  INCOMING_HEALING_CAP: 235,
  INCOMING_HEALING_MULTIPLIER: 233,
  INSPIRE: 403,
  IS_MORPHED: 294,
  ImmuneToSpellpower: 349,
  InvisibleDeathrattle: 335,
  JADE_GOLEM: 441,
  JADE_LOTUS: 483,
  JUST_PLAYED: 261,
  KABAL: 484,
  KAZAKUS_POTION_POWER_1: 471,
  KAZAKUS_POTION_POWER_2: 472,
  LAST_AFFECTED_BY: 18,
  LAST_CARD_PLAYED: 397,
  LINKEDCARD: 262,
  LINKED_ENTITY: 262,
  LOCK_AND_LOAD: 414,
  LOW_HEALTH_THRESHOLD: 353,
  LOYALTY: 216,
  LocalizationNotes: 344,
  MAGNET: 303,
  MAXHANDSIZE: 28,
  MAXRESOURCES: 176,
  MINION_TYPE_REFERENCE: 447,
  MISSION_EVENT: 6,
  MODIFY_DEFINITION_ATTACK: 473,
  MODIFY_DEFINITION_COST: 475,
  MODIFY_DEFINITION_HEALTH: 474,
  MORPH: 293,
  MULLIGAN_STATE: 305,
  MULTIPLE_CLASSES: 476,
  MULTIPLY_BUFF_VALUE: 375,
  MULTIPLY_HERO_DAMAGE: 374,
  MULTI_CLASS_GROUP: 480,
  NEXT_ALLY_BUFF: 302,
  NEXT_STEP: 198,
  NUM_ATTACKS_THIS_TURN: 297,
  NUM_CARDS_DRAWN_THIS_TURN: 399,
  NUM_CARDS_PLAYED_THIS_TURN: 269,
  NUM_FRIENDLY_MINIONS_THAT_ATTACKED_THIS_TURN: 417,
  NUM_FRIENDLY_MINIONS_THAT_DIED_THIS_GAME: 412,
  NUM_FRIENDLY_MINIONS_THAT_DIED_THIS_TURN: 398,
  NUM_MINIONS_KILLED_THIS_TURN: 369,
  NUM_MINIONS_PLAYED_THIS_TURN: 317,
  NUM_MINIONS_PLAYER_KILLED_THIS_TURN: 368,
  NUM_OPTIONS: 359,
  NUM_OPTIONS_PLAYED_THIS_TURN: 358,
  NUM_RESOURCES_SPENT_THIS_GAME: 418,
  NUM_TIMES_HERO_POWER_USED_THIS_GAME: 394,
  NUM_TURNS_IN_PLAY: 271,
  NUM_TURNS_LEFT: 272,
  OBFUSCATED: 391,
  OUTGOING_ABILITY_DAMAGE_ADJUSTMENT: 281,
  OUTGOING_ABILITY_DAMAGE_CAP: 284,
  OUTGOING_ABILITY_DAMAGE_MULTIPLIER: 283,
  OUTGOING_COMBAT_DAMAGE_ADJUSTMENT: 282,
  OUTGOING_COMBAT_DAMAGE_CAP: 288,
  OUTGOING_COMBAT_DAMAGE_MULTIPLIER: 287,
  OUTGOING_DAMAGE_ADJUSTMENT: 274,
  OUTGOING_DAMAGE_CAP: 273,
  OUTGOING_DAMAGE_MULTIPLIER: 275,
  OUTGOING_HEALING_ADJUSTMENT: 277,
  OUTGOING_HEALING_CAP: 276,
  OUTGOING_HEALING_MULTIPLIER: 278,
  OVERKILL: 380,
  OVERLOAD: 215,
  OVERLOAD_LOCKED: 393,
  OVERLOAD_OWED: 296,
  OVERLOAD_THIS_GAME: 427,
  OWNER: 51,
  OneTurnEffect: 338,
  PARENT_CARD: 316,
  PLAYER_ID: 30,
  PLAYSTATE: 17,
  POISONOUS: 363,
  POWERED_UP: 386,
  PREDAMAGE: 318,
  PREHEALING: 425,
  PREMIUM: 12,
  PROPOSED_ATTACKER: 39,
  PROPOSED_DEFENDER: 37,
  PROTECTED: 34,
  PROTECTING: 35,
  PROXY_CTHUN: 434,
  RARITY: 203,
  RECALL: 215,
  RECALL_OWED: 296,
  RECEIVES_DOUBLE_SPELLDAMAGE_BONUS: 404,
  RECENTLY_ARRIVED: 33,
  RED_MANA_CRYSTALS: 449,
  RESOURCES: 26,
  RESOURCES_USED: 25,
  REVEALED: 410,
  RITUAL: 424,
  SCORE_LABELID_1: 450,
  SCORE_LABELID_2: 452,
  SCORE_LABELID_3: 454,
  SCORE_VALUE_1: 451,
  SCORE_VALUE_2: 453,
  SCORE_VALUE_3: 455,
  SECRET: 219,
  SEEN_CTHUN: 445,
  SHADOWFORM: 416,
  SHIFTING: 438,
  SHOULDEXITCOMBAT: 312,
  SHOWN_HERO_POWER: 380,
  SILENCE: 339,
  SILENCED: 188,
  SPARE_PART: 388,
  SPELLPOWER: 192,
  SPELLPOWER_DOUBLE: 356,
  SPELLS_COST_HEALTH: 431,
  STARTHANDSIZE: 29,
  START_WITH_1_HEALTH: 372,
  STATE: 204,
  STEADY_SHOT_CAN_TARGET: 383,
  STEALTH: 191,
  STEALTH_READY: 307,
  STEP: 19,
  SUMMONED: 205,
  TAG_AI_MUST_PLAY: 367,
  TAG_HERO_POWER_DOUBLE: 366,
  TAG_LAST_KNOWN_COST_IN_HAND: 466,
  TAG_ONE_TURN_EFFECT: 338,
  TAG_SCRIPT_DATA_ENT_1: 4,
  TAG_SCRIPT_DATA_ENT_2: 5,
  TAG_SCRIPT_DATA_NUM_1: 2,
  TAG_SCRIPT_DATA_NUM_2: 3,
  TARGETING_ARROW_TEXT: 325,
  TAUNT: 190,
  TAUNT_READY: 306,
  TEAM_ID: 31,
  TEMP_RESOURCES: 295,
  TIMEOUT: 7,
  TOPDECK: 377,
  TO_BE_DESTROYED: 360,
  TRANSFORMED_FROM_CARD: 435,
  TREASURE: 415,
  TRIGGER_VISUAL: 32,
  TURN: 20,
  TURN_START: 8,
  TURN_TIMER_SLUSH: 9,
  UNTOUCHABLE: 448,
  WEAPON: 334,
  WINDFURY: 189,
  ZONE: 49,
  ZONE_POSITION: 263 }