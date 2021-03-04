/* exported motherBoardFilterCamp, cpuFilterCamp, coolerFilterCamp,
ramFilterCamp, pciFilterCamp, romCamp, M2Camp, psuCamp  */
const motherBoardFilterCamp = {
   chipset: {
      name: 'chipset',
      question: 'Selecione um chipset',
      answer: [
         {value: 'H410 Express', text: 'H410 Express'},
         {value: 'Z87 Express', text: 'Z87 Express'},
      ],
   },

   socket: {
      name: 'socket',
      question: 'Selecione um socket',
      answer: [
         {value: 'LGA1200', text: 'LGA1200'},
         {value: 'LGA1150', text: 'LGA1150'},
      ],
   },

   suportM2: {
      name: 'suportM2',
      question: 'suporte a entrada M2',
      answer: [
         {value: true, text: 'Possui'},
         {value: false, text: 'Não possui'},
      ],
   },

   memorySizeSupport: {
      name: 'memorySizeSupport',
      question: 'Limite maximo de Ram',
      answer: [
         {value: 32, text: '32 GB'},
         {value: 64, text: '64 GB'},
      ],
   },

   memorySlotAmount: {
      name: 'memorySlotAmount',
      question: 'Limite de slots de memória',
      answer: [
         {value: 1, text: '1'},
         {value: 2, text: '2'},
         {value: 3, text: '3'},
         {value: 4, text: '4'},
      ],
   },
   memorySlotType: {
      name: 'memorySlotType',
      question: 'Tipo de slot de memória',
      answer: [
         {value: 'DDR3', text: 'DDR3'},
         {value: 'DDR4', text: 'DDR4'},
      ],
   },
   motherFrequencies: {
      name: 'motherFrequencies',
      question: 'Frequências de memória suportadas',
      answer: [
         {value: 1600, text: '1600 MHz'},
         {value: 2133, text: '2133 MHz'},
         {value: 2333, text: '2333 MHz'},
         {value: 2400, text: '2400 MHz'},
         {value: 2666, text: '2666 MHz'},
         {value: 2933, text: '2933 MHz'},
         {value: 3000, text: '3000 MHz'},
      ],
   },
};

const cpuFilterCamp = {
   chipset: {
      name: 'chipset',
      question: 'Selecione um chipset',
      answer: [
         {value: 'H410 Express', text: 'H410 Express'},
         {value: 'Z87 Express', text: 'Z87 Express'},
      ],
   },
   socket: {
      name: 'socket',
      question: 'Selecione um socket',
      answer: [
         {value: 'LGA1200', text: 'LGA1200'},
         {value: 'LGA1150', text: 'LGA1150'},
      ],
   },
   memorySizeSupport: {
      name: 'memorySizeSupport',
      question: 'Limite maximo de Ram',
      answer: [
         {value: '32', text: '32 GB'},
         {value: '64', text: '64 GB'},
      ],
   },
   memorySlotAmount: {
      name: 'memorySlotAmount',
      question: 'Limite de slots de memória',
      answer: [
         {value: '1', text: '1'},
         {value: '2', text: '2'},
         {value: '3', text: '3'},
         {value: '4', text: '4'},
      ],
   },
   cpuFrequencies: {
      name: 'cpuFrequencies',
      question: 'Frequências de memória suportadas',
      answer: [
         {value: '1333', text: '1333 MHz'},
         {value: '1600', text: '1600 MHz'},
         {value: '2133', text: '2133 MHz'},
         {value: '2333', text: '2333 MHz'},
         {value: '2400', text: '2400 MHz'},
         {value: '2666', text: '2666 MHz'},
         {value: '2933', text: '2933 MHz'},
         {value: '3000', text: '3000 MHz'},
      ],
   },
   baseClockSpeed: {
      name: 'baseClockSpeed',
      question: 'Frequência mínima de clock',
      answer: [
         {value: '2.900', text: '2.900 GHz'},
         {value: '3.200', text: '3.200 GHz'},

      ],
   },
   maximumBoostSpeed: {
      name: 'maximumBoostSpeed',
      question: 'Frequência máxima de clock',
      answer: [
         {value: '3.200', text: '3.200 GHz'},
         {value: '4.300', text: '4.300 GHz'},
      ],
   },
   cache: {
      name: 'cache',
      question: 'Selecione tamanho do cache',
      answer: [
         {value: '3', text: '3 MB'},
         {value: '12', text: '12 MB'},
      ],
   },
   core: {
      name: 'core',
      question: 'Quantidade de nucleos',
      answer: [
         {value: '2', text: '2'},
         {value: '6', text: '6'},
      ],
   },
   threads: {
      name: 'threads',
      question: 'Quantidade de threads',
      answer: [
         {value: '12', text: '12'},
         {value: '4', text: '4'},
      ],
   },
   grapshicProcessor: {
      name: 'core',
      question: 'grapshicProcessor',
      answer: [
         {value: 'Intel UHD Graphics 630', text: 'Intel UHD Graphics 630'},
         {value: 'Intel HD Graphics 4400', text: 'Intel HD Graphics 4400'},
      ],
   },
};

const coolerFilterCamp = {
   compatibilityCpu: {
      name: 'compatibilityCpu',
      question: 'Selecione um socket',
      answer: [
         {value: 'LGA1200', text: 'LGA1200'},
         {value: 'LGA1150', text: 'LGA1150'},
         {value: 'LGA1151', text: 'LGA1151'},
      ],
   },
   speedFan: {
      name: 'speedFan',
      question: 'Velocidade do Fan',
      answer: [
         {value: '2000', text: '2000 RPM'},
         {value: '2200', text: '2200 RPM'},
      ],
   },
   fanAirflow: {
      name: 'fanAirflow',
      question: 'Máximo fluxo de ar do fan',
      answer: [
         {value: '35', text: '35 CFM'},
         {value: '42', text: '42 CFM'},
      ],
   },
};

const ramFilterCamp = {
   memoryFrequency: {
      name: 'memoryFrequency',
      question: 'Frequencia da memória',
      answer: [
         {value: '1600', text: '1600 MHz'},
         {value: '1866', text: '1866 MHz'},
         {value: '2400', text: '2400 MHz'},
         {value: '3000', text: '3000 MHz'},
      ],
   },
   memorySize: {
      name: 'memorySize',
      question: 'Tamanho de memória',
      answer: [
         {value: '8', text: '8 GB'},
      ],
   },
   memorySlotType: {
      name: 'memorySlotType',
      question: 'Tipo de slot',
      answer: [
         {value: 'DDR3', text: 'DDR3'},
         {value: 'DDR4', text: 'DDR4'},
      ],
   },
};

const pciFilterCamp = {
   baseClock: {
      name: 'baseClock',
      question: 'GPU base clock',
      answer: [
         {value: '1410', text: '1410 MHz'},
      ],
   },
   boostClock: {
      name: 'boostClock',
      question: 'GPU boost clock',
      answer: [
         {value: '1755', text: '1755 MHz'},
      ],
   },
   CUDACore: {
      name: 'CUDACore',
      question: 'CUDA core',
      answer: [
         {value: '896', text: '896'},
      ],
   },
   memoryInterface: {
      name: 'memoryInterface',
      question: 'Interface de memória',
      answer: [
         {value: '128 bits', text: '128 bits'},
      ],
   },
   memorySize: {
      name: 'memorySize',
      question: 'Tamanho de memória',
      answer: [
         {value: '4', text: '4 GB'},
      ],
   },
   memorySpeed: {
      name: 'memorySpeed',
      question: 'Velocidade de memória',
      answer: [
         {value: '12 Gbps', text: '12 Gbps'},
      ],
   },
   memoryType: {
      name: 'memoryType',
      question: 'Tipo de memória',
      answer: [
         {value: 'GDDR6', text: 'GDDR6'},
      ],
   },
};


const romCamp = {
   memorySize: {
      name: 'memorySize',
      question: 'Tamanho da memória',
      answer: [
         {value: '0.520', text: '0.520 GB'},
         {value: '1', text: '1 GB'},
      ],
   },
   reading: {
      name: 'reading',
      question: 'Velocidade de leitura',
      answer: [
         {value: '120 MB/s', text: '120 MB/s'},
         {value: '550 MB/s', text: '550 MB/s'},
      ],
   },
   writing: {
      name: 'writing',
      question: 'Velocidade de escrita',
      answer: [
         {value: '50 MB/s', text: '50 MB/s'},
         {value: '445 MB/s', text: '445 MB/s'},
      ],
   },
   rotation: {
      name: 'rotation',
      question: 'Rotação(para HDD)',
      answer: [
         {value: '5900', text: '5900 RPM'},
      ],
   },
};

const M2Camp = {
   format: {
      name: 'format',
      question: 'Interface',
      answer: [
         {value: 'NVMe', text: 'NVMe'},
      ],
   },
   memorySize: {
      name: 'memorySize',
      question: 'Tamanho de memória',
      answer: [
         {value: '0.250', text: '0.250 GB'},
      ],
   },
   model: {
      name: 'model',
      question: 'Formato',
      answer: [
         {value: '2280', text: '2280'},
      ],
   },
   reading: {
      name: 'reading',
      question: 'Velocidade de leitura',
      answer: [
         {value: '2000 MB/s', text: '2000 MB/s'},
      ],
   },
   writing: {
      name: 'writing',
      question: 'Velocidade de escrita',
      answer: [
         {value: '1100 MB/s', text: '1100 MB/s'},
      ],
   },
};

const psuCamp = {
   voltage: {
      name: 'voltage',
      question: 'Voltagem',
      answer: [
         {value: 'Bivolt', text: 'Bivolt'},
      ],
   },
   wattage: {
      name: 'wattage',
      question: 'Capacidade de saída',
      answer: [
         {value: '200', text: '200 W'},
         {value: '400', text: '400 W'},
      ],
   },
};