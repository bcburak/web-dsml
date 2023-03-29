export const readTemplate = (template, data = { items: {} }) => {
  let counter = 2;
  for (const [key, value] of Object.entries(template)) {
    data.items[key] = {
      index: key,
      canMove: true,
      isFolder: value !== null,
      children: value !== null ? Object.keys(value) : undefined,
      data: key,
      canRename: true,
      countIndex:counter++
    };

    if (value !== null) {
      readTemplate(value, data);
    }
  }
  return data;
};

const shortTreeTemplate = {
  root: {
    container: {
      item0: null,
      item1: null,
      item2: null,
      item3: {
        inner0: null,
        inner1: null,
        inner2: null,
        inner3: null,
      },
      item4: null,
      item5: null,
    },
  },
};

interface GarbageCollectorNode {
  Mas: any;
  Blueberry: any;
  [key: string]: any; // Allows any other string properties
}

interface ProjectsNode {
  GarbageCollector: GarbageCollectorNode;
}

interface RootNode {
  Projects: ProjectsNode;
}

const longTreeTemplate: RootNode = {
  root: {
    Projects: {
      GarbageCollector: {
        Mas: null,
        Blueberry: null,
      },
    },
  },
};

// const longTreeTemplate = {
//   root: {
//     Projects: {
//       GarbageCollector: {
//         Mas: null,
//         Blueberry: null,
//       },
//     },
//   },
// };


export {longTreeTemplate};

export const longTree = readTemplate(longTreeTemplate);
export const shortTree = readTemplate(shortTreeTemplate);