function convertMasModelToJava(masName, environmentName, operationsArr) {
  let code = `
  import jason.asSyntax.*;
  import jason.environment.Environment;
  import java.util.logging.Logger;
  
  public class ${masName} extends Environment {
    static Logger logger = Logger.getLogger(${masName}.class.getName());
    ${environmentName} ${convertFirstLetterToLowerCase(environmentName)} = new ${environmentName}();
  
    @Override
    public void init(String[] args) {
      // The init method can be used to receive parameters for the environment class
      // from the multi-agent system configuration. It is also normally appropriate to use
      // this method to initialise the lists of percepts with the properties of the
      // environment that will be perceptible when the system starts running
      // setting initial (global) percepts ...
      addPercept(Literal.parseLiteral("p(a)"));
      // if open-world is begin used, there can be
      // negated literals such as ...
      addPercept(Literal.parseLiteral("~q(b)"));
      // if this is to be perceived only by agent ag1
      addPercept("ag1", Literal.parseLiteral("p(a)"));
    }
  
    @Override
    public void stop() {
      /* Anything else to be done by the environment when
      the system is stopped...*/
    } 
   
  }
  `;
  let execActionBlock = convertExecActionBlock(environmentName, operationsArr);
  code = code + execActionBlock;

  return code;
}

function convertExecActionBlock(environmentName, operationsArray) {
  let code = `@Override
 public boolean executeAction(String ag, Structure act) {
    logger.info(ag + " doing: " + act);
    /* This is the most important method, where the
    effects of agent actions on perceptible properties
    of the environment is defined */
    boolean result = true;
  `;
  operationsArray.forEach((parameter, index) => {
    // const parameterIndex = index + 1;
    code += `  if (act.getFunctor().equals("${parameter}")) {
      result = ${convertFirstLetterToLowerCase(environmentName)}.${parameter}();
    }
  `;
  });

  code += `  return result;
  }
  }`;

  return code;
}

function convertFirstLetterToLowerCase(str) {
  return str.charAt(0).toLowerCase() + str.slice(1);
}

function convertEnvironmentModelToJava(environmentName, operationsArr) {

  let code = `public class ${environmentName} { 

     `;
  operationsArr.forEach((parameter, index) => {
    // const parameterIndex = index + 1;
    code += `  public boolean ${parameter}()  {
        //TODO: should be implemented for the ${parameter} operation.    
         return true;
       }
     `;
  });

  code += `}`;

  return code;

}

function convertAgentsToAslFile(agentName, aslFileMainList){

  let code = `// Agent ${agentName}
  /* Initial beliefs */
  available().
  
  /* Initial rules */
  
  /* Initial goals */
  
  /* Plans */\n`;

  // Add plan names from aslFileMainList to the ASL code
  aslFileMainList.forEach((aslData) => {
    code += `  @${aslData.planName.replace(",", ";")}\n`;
    code += `  +${aslData.beliefs}\n`;
    code += ` <-${aslData.actions}\n`;
  });
  return code;

}

function createAndDownloadFiles(filesArray, folderName) {
  // Create a new instance of JSZip
  var JSZip = require("jszip");
  const zip = new JSZip();

  // Define an array of file data

console.log("fileArray",filesArray);
  // Loop through the array of files
  filesArray.forEach((file) => {
    // Add each file to the ZIP archive
    zip.file(file.filename, file.content);
  });

  // Generate the ZIP archive asynchronously
  zip.generateAsync({ type: "blob" }).then((content) => {
    // Create a temporary URL
    const url = URL.createObjectURL(content);

    // Create an <a> element
    const link = document.createElement("a");

    // Set the href attribute to the temporary URL
    link.href = url;

    // Set the download attribute to specify the file name
    link.download = folderName;

    // Programmatically click the <a> element to trigger the file download
    link.click();

    // Clean up the temporary URL
    URL.revokeObjectURL(url);
  });
}

export { convertMasModelToJava, createAndDownloadFiles, convertEnvironmentModelToJava,convertAgentsToAslFile };

