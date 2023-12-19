import _cloneDeep from "lodash.clonedeep";
import { searchDFS, createFile, createFolder } from "../utils/utils.js";

export enum TreeActionTypes {
  FILECREATE = "FILE_CREATE",
  FOLDERCREATE = "FOLDER_CREATE",
  FILEEDIT = "FILE_EDIT",
  FOLDEREDIT = "FOLDER_EDIT",
  FILEDELETE = "FILE_DELETE",
  FOLDERDELETE = "FOLDER_DELETE",
  SETDATA = "SET_DATA",
}

// An interface for our actions
interface TreeAction {
  type: TreeActionTypes;
  payload: any;
}

const treeReducer = (state: any, action: TreeAction) => {
  let newState = _cloneDeep(state);
  let node = null;
  let parent = null;
  const allowedExtensions = [".cap", ".env", ".mas", ".pln"];

  if (action.payload && action.payload.id) {
    let foundNode = searchDFS({
      data: newState,
      cond: (item: any) => {
        return item.id === action.payload.id;
      },
    });
    node = foundNode.item;
    parent = node.parentNode;
  }

  switch (action.type) {
    case TreeActionTypes.SETDATA:
      console.log("setdata", action.payload);
      return action.payload;

    case TreeActionTypes.FILECREATE:
      console.log("files", node.files);
      console.log("fileNAme", action);

      if (action.payload.name.includes(".")) {
        let fileName = action.payload.name;
        let newFileExtension = "." + fileName.split(".")[1];
        if (!allowedExtensions.includes(newFileExtension)) {
          alert(
            "Invalid file extension. Allowed extensions are: .cap, .env, .mas, .pln"
          );
          return state;
        }
        // const newFileExtension = action.payload.name.slice(
        //   ((action.payload.name.lastIndexOf(".") - 1) >>> 0) + 2
        // );
        // alert("new file" + newFileExtension);
        // if (!allowedExtensions.includes(newFileExtension)) {
        //   alert(
        //     "Invalid file extension. Allowed extensions are: .cap, .env, .mas, .pln"
        //   );
        //   return { ...state, error: "Invalid file extension" };
        // }
      } else {
        alert("You should create file with extension. e.g Garbage.env");
        return state;
      }
      node.files.push(createFile({ name: action.payload.name }));
      return newState;

    case TreeActionTypes.FOLDERCREATE:
      node.files.push(createFolder({ name: action.payload.name }));
      return newState;

    case TreeActionTypes.FOLDEREDIT:
    case TreeActionTypes.FILEEDIT:
      node.name = action.payload.name;
      return newState;

    case TreeActionTypes.FOLDERDELETE:
    case TreeActionTypes.FILEDELETE:
      if (!parent || Array.isArray(parent)) {
        newState = newState.filter(
          (file: any) => file.id !== action.payload.id
        );
        return newState;
      } else {
        parent.files = parent.files.filter(
          (file: any) => file.id !== action.payload.id
        );
      }
      return newState;

    default:
      return state;
  }
};

export { treeReducer };
