import {ClassFeatures} from "./classFeatures.js"

// Namespace Configuration Values
export const DND5E = {};

// ASCII Artwork
DND5E.ASCII = `

███████ ██     ██ ███████ ███████ ███████  ██████  ██    ██ ███    ██ ██████  ██████  ██    ██ 
██      ██     ██ ██      ██      ██      ██    ██ ██    ██ ████   ██ ██   ██ ██   ██  ██  ██  
███████ ██  █  ██ ███████ █████   █████   ██    ██ ██    ██ ██ ██  ██ ██   ██ ██████    ████   
     ██ ██ ███ ██      ██ ██      ██      ██    ██ ██    ██ ██  ██ ██ ██   ██ ██   ██    ██    
███████  ███ ███  ███████ ███████ ██       ██████   ██████  ██   ████ ██████  ██   ██    ██    
                                                                                               
                                                                                               
`;


/**
 * The set of Ability Scores used within the system
 * @type {Object}
 */
DND5E.abilities = {
  "str": "DND5E.AbilityStr",
  "dex": "DND5E.AbilityDex",
  "con": "DND5E.AbilityCon",
  "int": "DND5E.AbilityInt",
  "wis": "DND5E.AbilityWis",
  "cha": "DND5E.AbilityCha"
};

DND5E.abilityAbbreviations = {
  "str": "DND5E.AbilityStrAbbr",
  "dex": "DND5E.AbilityDexAbbr",
  "con": "DND5E.AbilityConAbbr",
  "int": "DND5E.AbilityIntAbbr",
  "wis": "DND5E.AbilityWisAbbr",
  "cha": "DND5E.AbilityChaAbbr"
};

/* -------------------------------------------- */

/**
 * Character alignment options
 * @type {Object}
 */
DND5E.alignments = {
  'lg': "DND5E.AlignmentLG",
  'ng': "DND5E.AlignmentNG",
  'cg': "DND5E.AlignmentCG",
  'ln': "DND5E.AlignmentLN",
  'tn': "DND5E.AlignmentTN",
  'cn': "DND5E.AlignmentCN",
  'le': "DND5E.AlignmentLE",
  'ne': "DND5E.AlignmentNE",
  'ce': "DND5E.AlignmentCE"
};

DND5E.alignmentTiers = {
  '-10': "DND5E.ForceAlignDark10",
  '-9': "DND5E.ForceAlignDark9",
  '-8': "DND5E.ForceAlignDark8",
  '-7': "DND5E.ForceAlignDark7",
  '-6': "DND5E.ForceAlignDark6",
  '-5': "DND5E.ForceAlignDark5",
  '-4': "DND5E.ForceAlignDark4",
  '-3': "DND5E.ForceAlignDark3",
  '-2': "DND5E.ForceAlignDark2",
  '-1': "DND5E.ForceAlignDark1",
  '0': "DND5E.ForceAlignNeutral",
  '1': "DND5E.ForceAlignLight1",
  '2': "DND5E.ForceAlignLight2",
  '3': "DND5E.ForceAlignLight3",
  '4': "DND5E.ForceAlignLight4",
  '5': "DND5E.ForceAlignLight5",
  '6': "DND5E.ForceAlignLight6",
  '7': "DND5E.ForceAlignLight7",
  '8': "DND5E.ForceAlignLight8",
  '9': "DND5E.ForceAlignLight9",
  '10': "DND5E.ForceAlignLight10"
};

// TODO: Add rolltables to the appropriate levels
DND5E.tierProgression = {
  "-9": {
    dc: "20"
  },
  "-7": {
    dc: "18"
  },
  "-5": {
    dc: "16"
  },
  "-3": {
    dc: "14"
  },
  "-1": {
    dc: "12"
  },
  "0": null,
  "1": {
    dc: "12"
  },
  "3": {
    dc: "14"
  },
  "5": {
    dc: "16"
  },
  "7": {
    dc: "18"
  },
  "9": {
    dc: "20"
  },
}

/* -------------------------------------------- */

/**
 * An enumeration of item attunement types
 * @enum {number}
 */
DND5E.attunementTypes = {
  NONE: 0,
  REQUIRED: 1,
  ATTUNED: 2,
}

/**
 * An enumeration of item attunement states
 * @type {{"0": string, "1": string, "2": string}}
 */
DND5E.attunements = {
  0: "DND5E.AttunementNone",
  1: "DND5E.AttunementRequired",
  2: "DND5E.AttunementAttuned"
};

/* -------------------------------------------- */


DND5E.weaponProficiencies = {
  "sim": "DND5E.WeaponSimpleProficiency",
  "mar": "DND5E.WeaponMartialProficiency"
};

DND5E.toolProficiencies = {
  "armor": "DND5E.ToolArmormech",
  "arms": "DND5E.ToolArmstech",
  "arti": "DND5E.ToolArtificer",
  "art": "DND5E.ToolArtist",
  "astro": "DND5E.ToolAstrotech",
  "bio": "DND5E.ToolBiotech",
  "con": "DND5E.ToolConstructor",
  "cyb": "DND5E.ToolCybertech",
  "jew": "DND5E.ToolJeweler",
  "sur": "DND5E.ToolSurveyor",
  "syn": "DND5E.ToolSynthweaver",
  "tin": "DND5E.ToolTinker",
  "ant": "DND5E.ToolAntitoxkit",
  "arc": "DND5E.ToolArchaeologistKit",
  "aud": "DND5E.ToolAudiotechKit",
  "bioa": "DND5E.ToolBioanalysisKit",
  "brew": "DND5E.ToolBrewerKit",
  "chef": "DND5E.ToolChefKit",
  "demo": "DND5E.ToolDemolitionKit",
  "disg": "DND5E.ToolDisguiseKit",
  "forg": "DND5E.ToolForgeryKit",
  "mech": "DND5E.ToolMechanicKit",
  "game": "DND5E.ToolGamingSet",
  "poi": "DND5E.ToolPoisonKit",
  "scav": "DND5E.ToolScavengingKit",
  "secur": "DND5E.ToolSecurityKit",
  "slic": "DND5E.ToolSlicerKit",
  "spice": "DND5E.ToolSpiceKit",
  "music": "DND5E.ToolMusicalInstrument",
  "vehicle": "DND5E.ToolVehicle"
};


/* -------------------------------------------- */

/**
 * This Object defines the various lengths of time which can occur
 * @type {Object}
 */
DND5E.timePeriods = {
  "inst": "DND5E.TimeInst",
  "turn": "DND5E.TimeTurn",
  "round": "DND5E.TimeRound",
  "minute": "DND5E.TimeMinute",
  "hour": "DND5E.TimeHour",
  "day": "DND5E.TimeDay",
  "month": "DND5E.TimeMonth",
  "year": "DND5E.TimeYear",
  "perm": "DND5E.TimePerm",
  "spec": "DND5E.Special"
};


/* -------------------------------------------- */

/**
 * This describes the ways that an ability can be activated
 * @type {Object}
 */
DND5E.abilityActivationTypes = {
  "none": "DND5E.None",
  "action": "DND5E.Action",
  "bonus": "DND5E.BonusAction",
  "reaction": "DND5E.Reaction",
  "minute": DND5E.timePeriods.minute,
  "hour": DND5E.timePeriods.hour,
  "day": DND5E.timePeriods.day,
  "special": DND5E.timePeriods.spec,
  "legendary": "DND5E.LegAct",
  "lair": "DND5E.LairAct",
  "crew": "DND5E.VehicleCrewAction"
};

/* -------------------------------------------- */


DND5E.abilityConsumptionTypes = {
  "ammo": "DND5E.ConsumeAmmunition",
  "attribute": "DND5E.ConsumeAttribute",
  "material": "DND5E.ConsumeMaterial",
  "charges": "DND5E.ConsumeCharges"
};


/* -------------------------------------------- */

// Creature Sizes
DND5E.actorSizes = {
  "tiny": "DND5E.SizeTiny",
  "sm": "DND5E.SizeSmall",
  "med": "DND5E.SizeMedium",
  "lg": "DND5E.SizeLarge",
  "huge": "DND5E.SizeHuge",
  "grg": "DND5E.SizeGargantuan"
};

DND5E.tokenSizes = {
  "tiny": 1,
  "sm": 1,
  "med": 1,
  "lg": 2,
  "huge": 3,
  "grg": 4
};

/* -------------------------------------------- */

/**
 * Classification types for item action types
 * @type {Object}
 */
DND5E.itemActionTypes = {
  "mwak": "DND5E.ActionMWAK",
  "rwak": "DND5E.ActionRWAK",
  "msak": "DND5E.ActionMSAK",
  "rsak": "DND5E.ActionRSAK",
  "save": "DND5E.ActionSave",
  "heal": "DND5E.ActionHeal",
  "abil": "DND5E.ActionAbil",
  "util": "DND5E.ActionUtil",
  "other": "DND5E.ActionOther"
};

/* -------------------------------------------- */

DND5E.itemCapacityTypes = {
  "items": "DND5E.ItemContainerCapacityItems",
  "weight": "DND5E.ItemContainerCapacityWeight"
};

/* -------------------------------------------- */

/**
 * Enumerate the lengths of time over which an item can have limited use ability
 * @type {Object}
 */
DND5E.limitedUsePeriods = {
  "sr": "DND5E.ShortRest",
  "lr": "DND5E.LongRest",
  "day": "DND5E.Day",
  "charges": "DND5E.Charges"
};


/* -------------------------------------------- */

/**
 * The set of equipment types for armor, clothing, and other objects which can ber worn by the character
 * @type {Object}
 */
DND5E.equipmentTypes = {
  "light": "DND5E.EquipmentLight",
  "medium": "DND5E.EquipmentMedium",
  "heavy": "DND5E.EquipmentHeavy",
  "bonus": "DND5E.EquipmentBonus",
  "natural": "DND5E.EquipmentNatural",
  "shield": "DND5E.EquipmentShield",
  "clothing": "DND5E.EquipmentClothing",
  "trinket": "DND5E.EquipmentTrinket",
  "vehicle": "DND5E.EquipmentVehicle"
};


/* -------------------------------------------- */

/**
 * The set of Armor Proficiencies which a character may have
 * @type {Object}
 */
DND5E.armorProficiencies = {
  "lgt": DND5E.equipmentTypes.light,
  "med": DND5E.equipmentTypes.medium,
  "hvy": DND5E.equipmentTypes.heavy,
  "shl": "DND5E.EquipmentShieldProficiency"
};


/* -------------------------------------------- */

/**
 * Enumerate the valid consumable types which are recognized by the system
 * @type {Object}
 */
DND5E.consumableTypes = {
  "adrenal": "DND5E.ConsumableAdrenal",
  "poison": "DND5E.ConsumablePoison",
  "explosive": "DND5E.ConsumableExplosive",
  "food": "DND5E.ConsumableFood",
  "medpac": "DND5E.ConsumableMedpac",
  "technology": "DND5E.ConsumableTechnology",
  "ammunition": "DND5E.ConsumableAmmunition",
  "trinket": "DND5E.ConsumableTrinket",
  "force": "DND5E.ConsumableForce",
  "tech": "DND5E.ConsumableTech"
};

/* -------------------------------------------- */

/**
 * The valid currency denominations supported by the 5e system
 * @type {Object}
 */
DND5E.currencies = {
  "cr": "DND5E.CurrencyCr",
};

/* -------------------------------------------- */


// Damage Types
DND5E.damageTypes = {
  "acid": "DND5E.DamageAcid",
  "cold": "DND5E.DamageCold",
  "energy": "DND5E.DamageEnergy",
  "fire": "DND5E.DamageFire",
  "force": "DND5E.DamageForce",
  "ion": "DND5E.DamageIon",
  "kinetic": "DND5E.DamageKinetic",
  "lightning": "DND5E.DamageLightning",
  "necrotic": "DND5E.DamageNecrotic",
  "poison": "DND5E.DamagePoison",
  "psychic": "DND5E.DamagePsychic",
  "sonic": "DND5E.DamageSonic"
};

// Damage Resistance Types
DND5E.damageResistanceTypes = duplicate(DND5E.damageTypes);


/* -------------------------------------------- */

/**
 * The valid units of measure for movement distances in the game system.
 * By default this uses the imperial units of feet and miles.
 * @type {Object<string,string>}
 */
DND5E.movementTypes = {
  "burrow": "DND5E.MovementBurrow",
  "climb": "DND5E.MovementClimb",
  "fly": "DND5E.MovementFly",
  "swim": "DND5E.MovementSwim",
  "walk": "DND5E.MovementWalk",
}

/**
 * The valid units of measure for movement distances in the game system.
 * By default this uses the imperial units of feet and miles.
 * @type {Object<string,string>}
 */
DND5E.movementUnits = {
  "ft": "DND5E.DistFt",
  "mi": "DND5E.DistMi"
}

/**
 * The valid units of measure for the range of an action or effect.
 * This object automatically includes the movement units from DND5E.movementUnits
 * @type {Object<string,string>}
 */
DND5E.distanceUnits = {
  "none": "DND5E.None",
  "self": "DND5E.DistSelf",
  "touch": "DND5E.DistTouch",
  "spec": "DND5E.Special",
  "any": "DND5E.DistAny"
};
for ( let [k, v] of Object.entries(DND5E.movementUnits) ) {
  DND5E.distanceUnits[k] = v;
}

/* -------------------------------------------- */


/**
 * Configure aspects of encumbrance calculation so that it could be configured by modules
 * @type {Object}
 */
DND5E.encumbrance = {
  currencyPerWeight: 50,
  strMultiplier: 15,
  vehicleWeightMultiplier: 2000 // 2000 lbs in a ton
};

/* -------------------------------------------- */

/**
 * This Object defines the types of single or area targets which can be applied
 * @type {Object}
 */
DND5E.targetTypes = {
  "none": "DND5E.None",
  "self": "DND5E.TargetSelf",
  "creature": "DND5E.TargetCreature",
  "ally": "DND5E.TargetAlly",
  "enemy": "DND5E.TargetEnemy",
  "object": "DND5E.TargetObject",
  "space": "DND5E.TargetSpace",
  "radius": "DND5E.TargetRadius",
  "sphere": "DND5E.TargetSphere",
  "cylinder": "DND5E.TargetCylinder",
  "cone": "DND5E.TargetCone",
  "square": "DND5E.TargetSquare",
  "cube": "DND5E.TargetCube",
  "line": "DND5E.TargetLine",
  "wall": "DND5E.TargetWall"
};


/* -------------------------------------------- */


/**
 * Map the subset of target types which produce a template area of effect
 * The keys are DND5E target types and the values are MeasuredTemplate shape types
 * @type {Object}
 */
DND5E.areaTargetTypes = {
  cone: "cone",
  cube: "rect",
  cylinder: "circle",
  line: "ray",
  radius: "circle",
  sphere: "circle",
  square: "rect",
  wall: "ray"
};


/* -------------------------------------------- */

// Healing Types
DND5E.healingTypes = {
  "healing": "DND5E.Healing",
  "temphp": "DND5E.HealingTemp"
};


/* -------------------------------------------- */


/**
 * Enumerate the denominations of hit dice which can apply to classes
 * @type {Array.<string>}
 */
DND5E.hitDieTypes = ["d6", "d8", "d10", "d12"];


/* -------------------------------------------- */

/**
 * The set of possible sensory perception types which an Actor may have
 * @type {object}
 */
DND5E.senses = {
  "blindsight": "DND5E.SenseBlindsight",
  "darkvision": "DND5E.SenseDarkvision",
  "tremorsense": "DND5E.SenseTremorsense",
  "truesight": "DND5E.SenseTruesight"
};

/* -------------------------------------------- */

/**
 * The set of skill which can be trained
 * @type {Object}
 */
DND5E.skills = {
  "acr": "DND5E.SkillAcr",
  "ani": "DND5E.SkillAni",
  "ath": "DND5E.SkillAth",
  "dec": "DND5E.SkillDec",
  "ins": "DND5E.SkillIns",
  "itm": "DND5E.SkillItm",
  "inv": "DND5E.SkillInv",
  "lor": "DND5E.SkillLor",
  "med": "DND5E.SkillMed",
  "nat": "DND5E.SkillNat",
  "pil": "DND5E.SkillPil",
  "prc": "DND5E.SkillPrc",
  "prf": "DND5E.SkillPrf",
  "per": "DND5E.SkillPer",
  "slt": "DND5E.SkillSlt",
  "ste": "DND5E.SkillSte",
  "sur": "DND5E.SkillSur",
  "tec": "DND5E.SkillTec",
};


/* -------------------------------------------- */

DND5E.powerPreparationModes = {
  "prepared": "DND5E.SpellPrepPrepared",
  "pact": "DND5E.PactMagic",
  "always": "DND5E.SpellPrepAlways",
  "atwill": "DND5E.SpellPrepAtWill",
  "innate": "DND5E.SpellPrepInnate"
};

DND5E.spellUpcastModes = ["always", "pact", "prepared"];

DND5E.spellProgression = {
  "none": "DND5E.SpellNone",
  "full": "DND5E.SpellProgFull",
  "half": "DND5E.SpellProgHalf",
  "third": "DND5E.SpellProgThird",
  "pact": "DND5E.SpellProgPact",
  "artificer": "DND5E.SpellProgArt"
};

/* -------------------------------------------- */

/**
 * The available choices for how spell damage scaling may be computed
 * @type {Object}
 */
DND5E.spellScalingModes = {
  "none": "DND5E.SpellNone",
  "cantrip": "DND5E.SpellCantrip",
  "level": "DND5E.SpellLevel"
};

/* -------------------------------------------- */


/**
 * Define the set of types which a weapon item can take
 * @type {Object}
 */
DND5E.weaponTypes = {
  "simpleM": "DND5E.WeaponSimpleM",
  "simpleR": "DND5E.WeaponSimpleR",
  "martialM": "DND5E.WeaponMartialM",
  "martialR": "DND5E.WeaponMartialR",
  "natural": "DND5E.WeaponNatural",
  "improv": "DND5E.WeaponImprov",
  "siege": "DND5E.WeaponSiege"
};


/* -------------------------------------------- */

DND5E.armourProperties = {
  "absorptive": "DND5E.ArmourProperAbsorptive",
  "agile": "DND5E.ArmourProperAgile",
  "anchor": "DND5E.ArmourProperAnchor",
  "avoidant": "DND5E.ArmourProperAvoidant",
  "barbed": "DND5E.ArmourProperBarbed",
  "bulky": "DND5E.ArmourProperBulky",
  "charging": "DND5E.ArmourProperCharging",
  "concealing": "DND5E.ArmourProperConcealing",
  "cumbersome": "DND5E.ArmourProperCumbersome",
  "gauntleted": "DND5E.ArmourProperGauntleted",
  "imbalanced": "DND5E.ArmourProperImbalanced",
  "impermeable": "DND5E.ArmourProperImpermeable",
  "insulated": "DND5E.ArmourProperInsulated",
  "interlocking": "DND5E.ArmourProperInterlocking",
  "lambent": "DND5E.ArmourProperLambent",
  "lightweight": "DND5E.ArmourProperLightweight",
  "magnetic": "DND5E.ArmourProperMagnetic",
  "obscured": "DND5E.ArmourProperObscured",
  "obtrusive": "DND5E.ArmourProperObtrusive",
  "powered": "DND5E.ArmourProperPowered",
  "reactive": "DND5E.ArmourProperReactive",
  "regulated": "DND5E.ArmourProperRegulated",
  "reinforced": "DND5E.ArmourProperReinforced",
  "responsive": "DND5E.ArmourProperResponsive",
  "rigid": "DND5E.ArmourProperRigid",
  "silent": "DND5E.ArmourProperSilent",
  "spiked": "DND5E.ArmourProperSpiked",
  "strength": "DND5E.ArmourProperStrength",
  "steadfast": "DND5E.ArmourProperSteadfast",
  "versatile": "DND5E.ArmourProperVersatile"
}

/**
 * Define the set of weapon property flags which can exist on a weapon
 * @type {Object}
 */
DND5E.weaponProperties = {
  "amm": "DND5E.WeaponPropertiesAmm",
  "aut": "DND5E.WeaponPropertiesAut",
  "bur": "DND5E.WeaponPropertiesBur",
  "def": "DND5E.WeaponPropertiesDef",
  "dex": "DND5E.WeaponPropertiesDex",
  "dir": "DND5E.WeaponPropertiesDir",
  "drm": "DND5E.WeaponPropertiesDrm",
  "dgd": "DND5E.WeaponPropertiesDgd",
  "dis": "DND5E.WeaponPropertiesDis",
  "dpt": "DND5E.WeaponPropertiesDpt",
  "dou": "DND5E.WeaponPropertiesDou",
  "fin": "DND5E.WeaponPropertiesFin",
  "fix": "DND5E.WeaponPropertiesFix",
  "foc": "DND5E.WeaponPropertiesFoc",
  "hvy": "DND5E.WeaponPropertiesHvy",
  "hid": "DND5E.WeaponPropertiesHid",
  "ken": "DND5E.WeaponPropertiesKen",
  "lgt": "DND5E.WeaponPropertiesLgt",
  "lum": "DND5E.WeaponPropertiesLum",
  "mig": "DND5E.WeaponPropertiesMig",
  "pic": "DND5E.WeaponPropertiesPic",
  "rap": "DND5E.WeaponPropertiesRap",
  "rch": "DND5E.WeaponPropertiesRch",
  "rel": "DND5E.WeaponPropertiesRel",
  "ret": "DND5E.WeaponPropertiesRet",
  "shk": "DND5E.WeaponPropertiesShk",
  "sil": "DND5E.WeaponPropertiesSil",
  "spc": "DND5E.WeaponPropertiesSpc",
  "str": "DND5E.WeaponPropertiesStr",
  "thr": "DND5E.WeaponPropertiesThr",
  "two": "DND5E.WeaponPropertiesTwo",
  "ver": "DND5E.WeaponPropertiesVer",
  "vic": "DND5E.WeaponPropertiesVic"
};


// Spell Components
DND5E.spellComponents = {
  "V": "DND5E.ComponentVerbal",
  "S": "DND5E.ComponentSomatic",
  "M": "DND5E.ComponentMaterial"
};

// Spell Schools
DND5E.spellSchools = {
  "abj": "DND5E.SchoolAbj",
  "con": "DND5E.SchoolCon",
  "div": "DND5E.SchoolDiv",
  "enc": "DND5E.SchoolEnc",
  "evo": "DND5E.SchoolEvo",
  "ill": "DND5E.SchoolIll",
  "nec": "DND5E.SchoolNec",
  "trs": "DND5E.SchoolTrs"
};

// Spell Levels
DND5E.spellLevels = {
  0: "DND5E.SpellLevel0",
  1: "DND5E.SpellLevel1",
  2: "DND5E.SpellLevel2",
  3: "DND5E.SpellLevel3",
  4: "DND5E.SpellLevel4",
  5: "DND5E.SpellLevel5",
  6: "DND5E.SpellLevel6",
  7: "DND5E.SpellLevel7",
  8: "DND5E.SpellLevel8",
  9: "DND5E.SpellLevel9"
};

// Power Levels
DND5E.powerLevels = {
  0: "DND5E.PowerLevel0",
  1: "DND5E.PowerLevel1",
  2: "DND5E.PowerLevel2",
  3: "DND5E.PowerLevel3",
  4: "DND5E.PowerLevel4",
  5: "DND5E.PowerLevel5",
  6: "DND5E.PowerLevel6",
  7: "DND5E.PowerLevel7",
  8: "DND5E.PowerLevel8",
  9: "DND5E.PowerLevel9"
};

// Power Alignments
DND5E.powerAlignments = {
  "lig": "DND5E.PowerAlignmentLig",
  "dar": "DND5E.PowerAlignmentDar",
  "uni": "DND5E.PowerAlignmentUni"
};

// Power Alignments modifiers
DND5E.powerAlignmentsModifiers = {
  techpower: {
    "uni": ["int"],
  },
  forcepower: {
    "lig": ["wis"],
    "dar": ["cha"],
    "uni": ["wis", "cha"],
  }
};

// Spell Scroll Compendium UUIDs
DND5E.spellScrollIds = {
  0: 'Compendium.sw5efoundry.items.rQ6sO7HDWzqMhSI3',
  1: 'Compendium.sw5efoundry.items.9GSfMg0VOA2b4uFN',
  2: 'Compendium.sw5efoundry.items.XdDp6CKh9qEvPTuS',
  3: 'Compendium.sw5efoundry.items.hqVKZie7x9w3Kqds',
  4: 'Compendium.sw5efoundry.items.DM7hzgL836ZyUFB1',
  5: 'Compendium.sw5efoundry.items.wa1VF8TXHmkrrR35',
  6: 'Compendium.sw5efoundry.items.tI3rWx4bxefNCexS',
  7: 'Compendium.sw5efoundry.items.mtyw4NS1s7j2EJaD',
  8: 'Compendium.sw5efoundry.items.aOrinPg7yuDZEuWr',
  9: 'Compendium.sw5efoundry.items.O4YbkJkLlnsgUszZ'
};

/**
 * Define the standard slot progression by character level.
 * The entries of this array represent the spell slot progression for a full spell-caster.
 * @type {Array[]}
 */
DND5E.SPELL_SLOT_TABLE = [
  [2],
  [3],
  [4, 2],
  [4, 3],
  [4, 3, 2],
  [4, 3, 3],
  [4, 3, 3, 1],
  [4, 3, 3, 2],
  [4, 3, 3, 3, 1],
  [4, 3, 3, 3, 2],
  [4, 3, 3, 3, 2, 1],
  [4, 3, 3, 3, 2, 1],
  [4, 3, 3, 3, 2, 1, 1],
  [4, 3, 3, 3, 2, 1, 1],
  [4, 3, 3, 3, 2, 1, 1, 1],
  [4, 3, 3, 3, 2, 1, 1, 1],
  [4, 3, 3, 3, 2, 1, 1, 1, 1],
  [4, 3, 3, 3, 3, 1, 1, 1, 1],
  [4, 3, 3, 3, 3, 2, 1, 1, 1],
  [4, 3, 3, 3, 3, 2, 2, 1, 1]
];

/* -------------------------------------------- */

// Polymorph options.
DND5E.polymorphSettings = {
  keepPhysical: 'DND5E.PolymorphKeepPhysical',
  keepMental: 'DND5E.PolymorphKeepMental',
  keepSaves: 'DND5E.PolymorphKeepSaves',
  keepSkills: 'DND5E.PolymorphKeepSkills',
  mergeSaves: 'DND5E.PolymorphMergeSaves',
  mergeSkills: 'DND5E.PolymorphMergeSkills',
  keepClass: 'DND5E.PolymorphKeepClass',
  keepFeats: 'DND5E.PolymorphKeepFeats',
  keepSpells: 'DND5E.PolymorphKeepSpells',
  keepItems: 'DND5E.PolymorphKeepItems',
  keepBio: 'DND5E.PolymorphKeepBio',
  keepVision: 'DND5E.PolymorphKeepVision'
};

/* -------------------------------------------- */

/**
 * Skill, ability, and tool proficiency levels
 * Each level provides a proficiency multiplier
 * @type {Object}
 */
DND5E.proficiencyLevels = {
  0: "DND5E.NotProficient",
  1: "DND5E.Proficient",
  0.5: "DND5E.HalfProficient",
  2: "DND5E.Expertise"
};

/* -------------------------------------------- */

/**
 * The amount of cover provided by an object.
 * In cases where multiple pieces of cover are
 * in play, we take the highest value.
 */
DND5E.cover = {
  0: 'DND5E.None',
  .5: 'DND5E.CoverHalf',
  .75: 'DND5E.CoverThreeQuarters',
  1: 'DND5E.CoverTotal'
};

/* -------------------------------------------- */


// Condition Types
DND5E.conditionTypes = {
  "blinded": "DND5E.ConBlinded",
  "charmed": "DND5E.ConCharmed",
  "deafened": "DND5E.ConDeafened",
  "diseased": "DND5E.ConDiseased",
  "exhaustion": "DND5E.ConExhaustion",
  "frightened": "DND5E.ConFrightened",
  "grappled": "DND5E.ConGrappled",
  "incapacitated": "DND5E.ConIncapacitated",
  "invisible": "DND5E.ConInvisible",
  "paralyzed": "DND5E.ConParalyzed",
  "petrified": "DND5E.ConPetrified",
  "poisoned": "DND5E.ConPoisoned",
  "prone": "DND5E.ConProne",
  "restrained": "DND5E.ConRestrained",
  "shocked": "DND5E.ConShocked",
  "slowed": "DND5E.ConSlowed",
  "stunned": "DND5E.ConStunned",
  "unconscious": "DND5E.ConUnconscious"
};

// Languages
DND5E.languages = {
  "bith": "DND5E.LanguagesBith",
  "bothese": "DND5E.LanguagesBothese",
  "catharese": "DND5E.LanguagesCatharese",
  "cerean": "DND5E.LanguagesCerean",
  "cheunh": "DND5E.LanguagesCheunh",
  "devaronese": "DND5E.LanguagesDevaronese",
  "varies based on location": "DND5E.LanguagesVaries",
  "binary": "DND5E.LanguagesBinary",
  "durese": "DND5E.LanguagesDurese",
  "ewokese": "DND5E.LanguagesEwokese",
  "gamorrese": "DND5E.LanguagesGamorrese",
  "gungan": "DND5E.LanguagesGungan",
  "ithorese": "DND5E.LanguagesIthorese",
  "jawaese": "DND5E.LanguagesJawaese",
  "kelDor": "DND5E.LanguagesKelDor",
  "monCal": "DND5E.LanguagesMonCal",
  "nautila": "DND5E.LanguagesNautila",
  "rodese": "DND5E.LanguagesRodese",
  "sith": "DND5E.LanguagesSith",
  "togruti": "DND5E.LanguagesTogruti",
  "dosh": "DND5E.LanguagesDosh",
  "tusken": "DND5E.LanguagesTusken",
  "twileki": "DND5E.LanguagesTwileki",
  "sriluurian": "DND5E.LanguagesSriluurian",
  "shyriiwook": "DND5E.LanguagesShyriiwook",
  "zabraki": "DND5E.LanguagesZabraki",
  "abyssin": "DND5E.LanguagesAbyssin",
  "nonVerbal": "DND5E.LanguagesNonVerbal",
  "aleena": "DND5E.LanguagesAleena",
  "anzellan": "DND5E.LanguagesAnzellan",
  "aqualish": "DND5E.LanguagesAqualish",
  "arconese": "DND5E.LanguagesArconese",
  "adrennian": "DND5E.LanguagesAdrennian",
  "arkanian": "DND5E.LanguagesArkanian",
  "balosur": "DND5E.LanguagesBalosur",
  "barabel": "DND5E.LanguagesBarabel",
  "besalisk": "DND5E.LanguagesBesalisk",
  "chadraFan": "DND5E.LanguagesChadraFan",
  "chagri": "DND5E.LanguagesChagri",
  "chevin": "DND5E.LanguagesChevin",
  "chironan": "DND5E.LanguagesChironan",
  "clawdite": "DND5E.LanguagesClawdite",
  "codruese": "DND5E.LanguagesCodruese",
  "colicoid": "DND5E.LanguagesColicoid",
  "dashadi": "DND5E.LanguagesDashadi",
  "defel": "DND5E.LanguagesDefel",
  "draethos": "DND5E.LanguagesDraethos",
  "dug": "DND5E.LanguagesDug",
  "kharan": "DND5E.LanguagesKharan",
  "falleen": "DND5E.LanguagesFalleen",
  "felucianese": "DND5E.LanguagesFelucianese",
  "rakata": "DND5E.LanguagesRakata",
  "gand": "DND5E.LanguagesGand",
  "geonosian": "DND5E.LanguagesGeonosian",
  "givin": "DND5E.LanguagesGivin",
  "antarian": "DND5E.LanguagesAntarian",
  "gran": "DND5E.LanguagesGran",
  "harchese": "DND5E.LanguagesHarchese",
  "herglese": "DND5E.LanguagesHerglese",
  "huttese": "DND5E.LanguagesHuttese",
  "iktotchese": "DND5E.LanguagesIktotchese",
  "kaleesh": "DND5E.LanguagesKaleesh",
  "kaminoan": "DND5E.LanguagesKaminoan",
  "galacticBasic": "DND5E.LanguagesBasic",
  "karkaran": "DND5E.LanguagesKarkaran",
  "killik": "DND5E.LanguagesKillik",
  "klatooinian": "DND5E.LanguagesKlatooinian",
  "kubazian": "DND5E.LanguagesKubazian",
  "kushiban": "DND5E.LanguagesKushiban",
  "kyuzo": "DND5E.LanguagesKyuzo",
  "lannik": "DND5E.LanguagesLannik",
  "lasat": "DND5E.LanguagesLasat",
  "lurmese": "DND5E.LanguagesLurmese",
  "miralukese": "DND5E.LanguagesMiralukese",
  "mirialan": "DND5E.LanguagesMirialan",
  "mustafarian": "DND5E.LanguagesMustafarian",
  "muun": "DND5E.LanguagesMuun",
  "pakPak": "DND5E.LanguagesPakPak",
  "honoghran": "DND5E.LanguagesHonoghran",
  "ortolan": "DND5E.LanguagesOrtolan",
  "lowickese": "DND5E.LanguagesLowickese",
  "utapese": "DND5E.LanguagesUtapese",
  "pyke": "DND5E.LanguagesPyke",
  "quarrenese": "DND5E.LanguagesQuarrenese",
  "rattataki": "DND5E.LanguagesRattataki",
  "rishii": "DND5E.LanguagesRishii",
  "ryn": "DND5E.LanguagesRyn",
  "selkatha": "DND5E.LanguagesSelkatha",
  "shistavanen": "DND5E.LanguagesShistavanen",
  "squibbian": "DND5E.LanguagesSquibbian",
  "ssiRuuvi": "DND5E.LanguagesSsiruuvi",
  "sullestese": "DND5E.LanguagesSullestese",
  "talzzi": "DND5E.LanguagesTalzzi",
  "tarasinese": "DND5E.LanguagesTarasinese",
  "thisspiasian": "DND5E.LanguagesThisspiasian",
  "togorese": "DND5E.LanguagesTogorese",
  "toydarian": "DND5E.LanguagesToydarian",
  "ugnaught": "DND5E.LanguagesUgnaught",
  "umbaran": "DND5E.LanguagesUmbaran",
  "verpine": "DND5E.LanguagesVerpine",
  "voss": "DND5E.LanguagesVoss",
  "semblan": "DND5E.LanguagesSemblan",
  "yevethan": "DND5E.LanguagesYevethan",
  "zygerrian": "DND5E.LanguagesZygerrian",
};

// Character Level XP Requirements
DND5E.CHARACTER_EXP_LEVELS =  [
  0, 300, 900, 2700, 6500, 14000, 23000, 34000, 48000, 64000, 85000, 100000,
  120000, 140000, 165000, 195000, 225000, 265000, 305000, 355000]
;

// Challenge Rating XP Levels
DND5E.CR_EXP_LEVELS = [
  10, 200, 450, 700, 1100, 1800, 2300, 2900, 3900, 5000, 5900, 7200, 8400, 10000, 11500, 13000, 15000, 18000,
  20000, 22000, 25000, 33000, 41000, 50000, 62000, 75000, 90000, 105000, 120000, 135000, 155000
];

// Character Features Per Class And Level
DND5E.classFeatures = ClassFeatures;

// Configure Optional Character Flags
DND5E.characterFlags = {
  "savageAttacks": {
    name: "DND5E.FlagsSavageAttacks",
    hint: "DND5E.FlagsSavageAttacksHint",
    section: "Racial Traits",
    type: Boolean
  },
  "elvenAccuracy": {
    name: "DND5E.FlagsElvenAccuracy",
    hint: "DND5E.FlagsElvenAccuracyHint",
    section: "Racial Traits",
    type: Boolean
  },
  "forceCaster": {
    name: "DND5E.FlagsForceCaster",
    hint: "DND5E.FlagsForceCasterHint",
    section: "Casting",
    type: Boolean
  },
  "halflingLucky": {
    name: "DND5E.FlagsHalflingLucky",
    hint: "DND5E.FlagsHalflingLuckyHint",
    section: "Racial Traits",
    type: Boolean
  },
  "ignoreAlignmentEffects": {
    name: "DND5E.FlagsIgnoreAlignmentEffect",
    hint: "DND5E.FlagsIgnoreAlignmentEffectHint",
    section: "Casting",
    type: Boolean
  },
  "initiativeAdv": {
    name: "DND5E.FlagsInitiativeAdv",
    hint: "DND5E.FlagsInitiativeAdvHint",
    section: "Feats",
    type: Boolean
  },
  "initiativeAlert": {
    name: "DND5E.FlagsAlert",
    hint: "DND5E.FlagsAlertHint",
    section: "Feats",
    type: Boolean
  },
  "jackOfAllTrades": {
    name: "DND5E.FlagsJOAT",
    hint: "DND5E.FlagsJOATHint",
    section: "Feats",
    type: Boolean
  },
  "observantFeat": {
    name: "DND5E.FlagsObservant",
    hint: "DND5E.FlagsObservantHint",
    skills: ['prc','inv'],
    section: "Feats",
    type: Boolean
  },
  "powerfulBuild": {
    name: "DND5E.FlagsPowerfulBuild",
    hint: "DND5E.FlagsPowerfulBuildHint",
    section: "Racial Traits",
    type: Boolean
  },
  "reliableTalent": {
    name: "DND5E.FlagsReliableTalent",
    hint: "DND5E.FlagsReliableTalentHint",
    section: "Feats",
    type: Boolean
  },
  "remarkableAthlete": {
    name: "DND5E.FlagsRemarkableAthlete",
    hint: "DND5E.FlagsRemarkableAthleteHint",
    abilities: ['str','dex','con'],
    section: "Feats",
    type: Boolean
  },
  "techCaster": {
    name: "DND5E.FlagsTechCaster",
    hint: "DND5E.FlagsTechCasterHint",
    section: "Casting",
    type: Boolean
  },
  "weaponCriticalThreshold": {
    name: "DND5E.FlagsWeaponCritThreshold",
    hint: "DND5E.FlagsWeaponCritThresholdHint",
    section: "Feats",
    type: Number,
    placeholder: 20
  },
  "spellCriticalThreshold": {
    name: "DND5E.FlagsSpellCritThreshold",
    hint: "DND5E.FlagsSpellCritThresholdHint",
    section: "Feats",
    type: Number,
    placeholder: 20
  },
  "forcepowerCriticalThreshold": {
    name: "DND5E.FlagsSpellCritThreshold",
    hint: "DND5E.FlagsSpellCritThresholdHint",
    section: "Feats",
    type: Number,
    placeholder: 20
  },
  "techpowerCriticalThreshold": {
    name: "DND5E.FlagsSpellCritThreshold",
    hint: "DND5E.FlagsSpellCritThresholdHint",
    section: "Feats",
    type: Number,
    placeholder: 20
  },
  "meleeCriticalDamageDice": {
    name: "DND5E.FlagsMeleeCriticalDice",
    hint: "DND5E.FlagsMeleeCriticalDiceHint",
    section: "Feats",
    type: Number,
    placeholder: 0
  },
};

// Configure allowed status flags
DND5E.allowedActorFlags = ["isPolymorphed", "originalActor"].concat(Object.keys(DND5E.characterFlags));
