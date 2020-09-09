export function validateStringField(field: string): boolean {
  if (!field || field === undefined) {
    return false;
  }
  if (field === "") {
    return false;
  }
  if (new RegExp(/\s/gm).test(field)) {
    return false;
  }
  if (new RegExp(/^.*?(?=[\^#%&$\*:<>\?/\{\|\}]).*$/).test(field)) {    
    return false;
  }

  return true;
}

export function validatePasswordField(field: string): boolean {
  if (!field || field === undefined) {
    return false;
  }
  if (field === "") {
    return false;
  }

  return true;
}

export function validateDateField(field: string) {
  if (!field) {
    return false;
  }

  return true;
}
