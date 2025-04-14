export async function fetchProjects() {
    const myHeaders = new Headers();
    myHeaders.append("accept", "*/*");
    myHeaders.append(
      "apiKey",
      "ONjViogekmFKvSkFhYNsgQS56WNG08EORGL9QGarF8gl5aObzzBikmJlmo2wHEQ"
    );
    myHeaders.append("Content-Type", "application/json");
  
    const raw = JSON.stringify({});
  
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
  
    const response = await fetch(
      "https://integration.psi-crm.com/ExternalApis/GetAllProperties?pageIndex=1&pageSize=10",
      requestOptions
    );
  
    if (!response.ok) {
      const error = new Error("An error occurred while fetching projects");
      error.code = response.status;
        error.info = await response.json();
      throw error;
    }
  
    const projects = await response.json();
    //setLoading(false);
    return projects;
  }
  
  export async function fetchProjectsByName(projectName) {
    const myHeaders = new Headers();
    myHeaders.append("accept", "*/*");
    myHeaders.append(
      "apiKey",
      "ONjViogekmFKvSkFhYNsgQS56WNG08EORGL9QGarF8gl5aObzzBikmJlmo2wHEQ"
    );
    myHeaders.append("Content-Type", "application/json");
    
    const raw = JSON.stringify({"propertyName": projectName});
  
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
      body: raw
    };
  
    const response = await fetch(
      "https://integration.psi-crm.com/ExternalApis/GetAllProperties?pageIndex=1&pageSize=1",
      requestOptions
    );
  
    if (!response.ok) {
      const error = new Error("An error occurred while fetching projects");
      error.code = response.status;
      error.info = await response.json();
      throw error;
    }
  
    const projects = await response.json();
    //setLoading(false);
    return projects;
  }
  
  export async function fetchProjectsByCountry(projectId) {
    const myHeaders = new Headers();
    myHeaders.append("accept", "*/*");
    myHeaders.append(
      "apiKey",
      "ONjViogekmFKvSkFhYNsgQS56WNG08EORGL9QGarF8gl5aObzzBikmJlmo2wHEQ"
    );
    myHeaders.append("Content-Type", "application/json");
  
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
  
    const response = await fetch(
      "https://integration.psi-crm.com/ExternalApis/GetLookupItems?lookupParentId="+projectId,
      requestOptions
    );
  
    if (!response.ok) {
      const error = new Error("An error occurred while fetching projects");
      error.code = response.status;
      error.info = await response.json();
      throw error;
    }
  
    const projects = await response.json();
    //setLoading(false);
    return projects;
  }
  
  
  