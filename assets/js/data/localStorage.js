import {getGrids} from './db.js';

const multiplesParts = ['ram', 'rom'];
const sizeSum = ['ram', 'rom', 'm2'];

function generateBuildingPC() {
   return {
      motherBoard: null,
      cpu: null,
      cooler: null,
      ram: [],
      rom: [],
      m2: null,
      pciExpress: null,
      powerSupply: null,
      currentTDP: 0,
      ramMemory: 0,
      romMemory: 0,
   };
}

function multipleSlots(part, idDiv, PCBuilding) {
   if (!PCBuilding[part.type]) PCBuilding[part.type] = [];

   PCBuilding[part.type].push({...part, div: idDiv});
   return PCBuilding;
}

function addSize(part, PCBuilding) {
   const addField = `${part.type}Memory`;
   PCBuilding[addField] = PCBuilding[addField] + part.memorySize;
   return PCBuilding;
}

function deleteArray(part, PCBuilding) {
   const answer = PCBuilding[part.type].filter((element) => {
      part.div = element.div;

      if (JSON.stringify(element) === JSON.stringify(part)) {
         const removeField = `${part.type}Memory`;
         PCBuilding[removeField] = PCBuilding[removeField] - part.memorySize;
      }

      return JSON.stringify(element) !== JSON.stringify(part);
   });

   if (answer.length === 0) return [];
   else return answer;
}

// export

// configurações do localStorage do buildingPC
export function getPCBuilding() {
   return JSON.parse(localStorage.getItem('buildingPC'));
}

export function setBuildingPC(part, idDiv) {
   let PCBuilding = getPCBuilding() ? getPCBuilding() : generateBuildingPC();

   if (part) {
      if (multiplesParts.includes(part.type)) {
         PCBuilding = multipleSlots(part, idDiv, PCBuilding);
      } else {
         PCBuilding[part.type] = part;
      }

      PCBuilding.currentTDP = PCBuilding.currentTDP + part.TDP;

      if (sizeSum.includes(part.type)) PCBuilding = addSize(part, PCBuilding);
   }
   localStorage.setItem('buildingPC', JSON.stringify(PCBuilding));
}

export function deletePCBuilding(deletePart) {
   const PCBuilding = getPCBuilding();

   if (multiplesParts.includes(deletePart.type)) {
      PCBuilding[deletePart.type] = deleteArray(deletePart, PCBuilding);
   } else {
      PCBuilding[deletePart.type] = null;
      if (deletePart.type === 'm2') {
         PCBuilding.romMemory = PCBuilding.romMemory - deletePart.memorySize;
      }
   }

   PCBuilding.currentTDP = PCBuilding.currentTDP - deletePart.TDP;

   localStorage.setItem('buildingPC', JSON.stringify(PCBuilding));
}

// configurações da drop zone
export async function setDropZone(id) {
   const grids = await getGrids(id);
   const dropZone = {
      mode: 'motherboard',
      ...grids,
   };
   localStorage.setItem('dropZone', JSON.stringify(dropZone));
}

export function getDropZone() {
   return JSON.parse(localStorage.getItem('dropZone'));
}

export function setModelDropZone(value) {
   const dropZone = getDropZone();
   dropZone.mode = value;
   localStorage.setItem('dropZone', JSON.stringify(dropZone));
}

export function resetLocalStorage(evaluativeMode) {
   const evaluative = getEvaluativeMode();
   localStorage.clear();
   if (evaluativeMode !== null && evaluativeMode !== undefined) {
      setEvaluativeMode(evaluativeMode);
   } else {
      setEvaluativeMode(evaluative);
   }
}

// modo de jogo
export async function setEvaluativeMode(isEvaluative) {
   localStorage.setItem('evaluativeMode', JSON.stringify(isEvaluative));
}

export function getEvaluativeMode() {
   return JSON.parse(localStorage.getItem('evaluativeMode'));
}

// erros do modo prova

function generateErrorReport() {
   return {
      motherBoard: null,
      cpu: null,
      cooler: null,
      ram: [],
      rom: [],
      m2: null,
      pciExpress: null,
      powerSupply: null,
      currentTDP: 0,
      ramMemory: 0,
      romMemory: 0,
      recorder: null,
   };
}

export function setErrorReport(part, idDiv, error) {
   let errorReport = getErrorReport() ? getErrorReport() :
      generateErrorReport();

   if (multiplesParts.includes(part.type)) {
      errorReport = multipleSlotsError(part, idDiv, errorReport, error);
   } else {
      errorReport[part.type] = errorMessage(error);
   }
   localStorage.setItem('errorReport', JSON.stringify(errorReport));
}

export function getErrorReport() {
   let errors = JSON.parse(localStorage.getItem('errorReport'));
   if (!errors) {
      errors = generateErrorReport();
      localStorage.setItem('errorReport', JSON.stringify(errors));
   }
   return errors;
}

function multipleSlotsError(part, idDiv, errorReport, error) {
   if (!errorReport[part.type]) errorReport[part.type] = [];

   errorReport[part.type].push({...errorMessage(error), div: idDiv});
   return errorReport;
}

function errorMessage(compatibility) {
   return {
      situation: compatibility.situation === 'incompatible' ? 'Incompatível' :
         'Mau funcionamento',
      error: compatibility.error,
   };
}

export function deleteErrorReport(deletePart, compatibility, idDiv) {
   const errorReport = getErrorReport();
   if (multiplesParts.includes(deletePart.type)) {
      errorReport[deletePart.type] = deleteArrayError(deletePart,
         errorReport, errorMessage(compatibility), idDiv);
   } else {
      errorReport[deletePart.type] = null;
   }

   localStorage.setItem('errorReport', JSON.stringify(errorReport));
}

function deleteArrayError(part, errorReport, error, idDiv) {
   const answer = errorReport[part.type].filter((element) => {
      error.div = idDiv;
      return JSON.stringify(element) !== JSON.stringify(error);
   });
   if (answer.length === 0) return [];
   else return answer;
}


// cable
function generateCable() {
   return {
      powerSupply: false,
      record: false,
      rom1: false,
      rom2: false,
      sata1: false,
      sata2: false,
      sata3: false,
      sata4: false,
   };
}

export function getCable() {
   let cable = JSON.parse(localStorage.getItem('cables'));
   if (!cable) {
      cable = generateCable();
      localStorage.setItem('cables', JSON.stringify(cable));
   }
   return cable;
}

export function setCable(partType, value) {
   const cable = getCable() ? getCable() : generateCable();

   cable[partType] = value;
   localStorage.setItem('cables', JSON.stringify(cable));
}

// cableSata
function generateSataPath() {
   return {
      recorder: [],
      rom1: [],
      rom2: [],
   };
}

export function getSataPath() {
   let path = JSON.parse(localStorage.getItem('sataPath'));
   if (!path) {
      path = generateSataPath();
      localStorage.setItem('sataPath', JSON.stringify(path));
   }
   return path;
}

export function setSataPath(partType, value) {
   const path = getSataPath() ? getSataPath() : generateSataPath();

   path[partType] = value;
   localStorage.setItem('sataPath', JSON.stringify(path));
}
