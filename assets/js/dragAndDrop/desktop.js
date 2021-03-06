import {showTitleTabs, disableTab} from '../tab.js';
import {listParts} from '../listParts.js';
import {
   setBuildingPC,
   setDropZone,
   getDropZone,
   deletePCBuilding,
   getPCBuilding,
   getEvaluativeMode,
   setErrorReport,
   deleteErrorReport,
   setCable,
}
   from '../data/localStorage.js';
import {motherboardMode, coolerZone} from '../visualHardware.js';
import {
   phantomDivRemove,
   showSaveZone,
   hideSaveZone,
   loading,
} from '../helper/utils.js';
import {
   pcieSpecificity,
   ramSpecificity,
   tradeImagem,
   motherBoardSpecificity,
} from '../helper/partSpecificity.js';
import partBox from '../components/partBox.js';
import resizeGrid from '../helper/dropZone.js';
import {checkCompatibility} from '../helper/checkCompatibility.js';
import {openAlert} from '../alert.js';
import {activatePlug} from '../helper/plugHelper.js';
import {
   psuPlugged,
   recordPluggedDisable,
   romPluggedDisable,
   sataMotherUnpluggedPSU,
   sataMotherUnpluggedRom,
} from '../helper/cablingHelper.js';

function partSpecificity(partType, idDropZone, part, slot) {
   switch (partType) {
   case 'pciExpress':
      pcieSpecificity(idDropZone, part.dropImage);
      break;
   case 'ram':
      ramSpecificity(slot, part.dropImage);
      break;
   case 'powerSupply':
      tradeImagem(idDropZone, part.dropImage);
      activatePlug('plugPSU', 'inline');
      break;
   case 'rom':
      tradeImagem(idDropZone, part.dropImage);
      if (idDropZone === 'drag_rom_1') {
         activatePlug('plugRom1', 'inline');
      }
      if (idDropZone === 'drag_rom_2') {
         activatePlug('plugRom2', 'inline');
      }
      break;
   case 'recorder':
      tradeImagem(idDropZone, part.dropImage);
      activatePlug('plugRecord', 'inline');
      break;
   case 'm2':
      tradeImagem(idDropZone, part.dropImage);
      break;
   case 'motherBoard':
      motherBoardSpecificity();
      break;
   case 'cooler':
      activatePlug('plugCooler', 'inline');
      break;
   }
}

function checkSlot(idSection, partType) {
   let answer = false;

   if (idSection.slice(idSection.length - 2, idSection.length - 1) === '_') {
      const id = idSection.slice(0, idSection.length - 2);
      if (id === partType) answer = true;
   }
   if (idSection === partType) answer = true;

   return answer;
}

async function installMotherboard(part) {
   // armengue para recarregar as placas
   listParts('motherBoardTab', 'Placa-mãe');
   setBuildingPC(part);

   await setDropZone(part.id);
   motherboardMode();
   partSpecificity(part.type);

   // liberar botoes do menu
   const titleTabs = Array.from(document.getElementsByClassName('titleTab'));
   disableTab(titleTabs);
}

function compatible(event, idDropZone, part, compatibility) {
   event.target.appendChild(document.getElementById(idDropZone));
   partSpecificity(part.type, idDropZone, part, event.target.id);
   phantomDivRemove();
   setBuildingPC(part, event.target.id);
   if (compatibility !== undefined) {
      if (compatibility.error) {
         setErrorReport(part, event.target.id, compatibility);
      }
   }
   const {mode} = getDropZone();
   resizeGrid(mode);


   // liberar botoes do menu
   const titleTabs = Array.from(document.getElementsByClassName('titleTab'));
   disableTab(titleTabs);
}

function malfunction(event, idDropZone, part, error) {
   openAlert('confirmAttention', ' Atenção!!!', error);

   event.target.appendChild(document.getElementById(idDropZone));
   partSpecificity(part.type, idDropZone, part, event.target.id);
   phantomDivRemove();
   setBuildingPC(part, event.target.id);

   const {mode} = getDropZone();
   resizeGrid(mode);

   // liberar botoes do menu
   const titleTabs = Array.from(document.getElementsByClassName('titleTab'));
   disableTab(titleTabs);
}

function incompatible(error) {
   openAlert('confirmDanger', ' Erro!!!', error);
}

export function drag(event, part) {
   event.dataTransfer.setData('text', event.target.id);
   event.dataTransfer.setData('part', JSON.stringify(part));
   showSaveZone();// construir depois
}

export function dropEnd() {
   hideSaveZone();// construir depois
}

export function allowDrop(event) {
   event.preventDefault();
}

export async function drop(event) {
   event.preventDefault();

   const data = event.dataTransfer.getData('text');
   const part = JSON.parse(event.dataTransfer.getData('part'));
   if (part.type === 'motherBoard') {
      if (!getPCBuilding().motherBoard) {
         await installMotherboard(part);
         loading(false);
         setTimeout(() => {
            showTitleTabs();
         }, 200);
      } else {
         openAlert('confirmDanger', ' Erro', 'já possui placa mãe');
      }
   } else {
      if (checkSlot(event.target.id, part.type)) {
         const compatibility = checkCompatibility(part);
         if (getEvaluativeMode()) {
            compatible(event, data, part, compatibility);
         } else {
            switch (compatibility.situation) {
            case 'compatible':
               compatible(event, data, part);
               break;
            case 'malfunction':
               malfunction(event, data, part, compatibility.error);
               break;
            case 'incompatible':
               incompatible(compatibility.error);
               break;
            }
         }

         setTimeout(() => {
            showTitleTabs();
         }, 200);
      } else {
         if (event.target.id.slice(0, 4) === 'drag') {
            openAlert('confirmDanger', ' Erro!!!',
               'já possui peça, retire a atual');
         } else {
            // verificar se é para mostrar esse aviso ou não
            openAlert('confirmDanger', ' Erro!!!',
               'Esse não é o local da peça');
         }
      }
   }
   coolerZone();
}

export function dropSave(event, typeTab) { // drop da save zone
   event.preventDefault();

   const data = event.dataTransfer.getData('text');
   const part = JSON.parse(event.dataTransfer.getData('part'));

   const imgDelete = document.getElementById(data);
   removeError(part, imgDelete.parentNode.id);
   imgDelete.parentNode.removeChild(imgDelete);
   partSpecificityRemove(part.type, part);

   if (part.type === typeTab) {
      const droppableParts = document.getElementById('droppableParts');
      droppableParts.appendChild(partBox(part));
   }
   removeError(part);
   deletePCBuilding(part);
   phantomDivRemove();

   const {mode} = getDropZone();
   resizeGrid(mode);

   const titleTabs = Array.from(document.getElementsByClassName('titleTab'));
   disableTab(titleTabs);
}

function removeError(part, idDiv) {
   if (getEvaluativeMode()) { // ultima mudança feita
      const compatibility = checkCompatibility(part);
      if (compatibility.situation !== 'compatible') {
         deleteErrorReport(part, compatibility, idDiv);
      }
   }
}

function partSpecificityRemove(partType, part) {
   switch (partType) {
   case 'powerSupply':
      activatePlug('plugPSU', 'none');
      psuPlugged('none');
      setCable('powerSupply', false);
      recordPluggedDisable();
      romPluggedDisable(true, part);
      break;
   case 'recorder':
      activatePlug('plugRecord', 'none');
      recordPluggedDisable();
      sataMotherUnpluggedPSU();
      break;
   case 'rom':
      romPluggedDisable(false, part);
      sataMotherUnpluggedRom(part);
      break;
   case 'cooler':
      activatePlug('plugCooler', 'none');
      document.getElementById('plugCooler').classList.remove('plugged');
      activatePlug('thread_mother_cooler_01', 'none');
      activatePlug('thread_mother_cooler_02', 'none');
      setCable('cooler', false);
      break;
   }
}
