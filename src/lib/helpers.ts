import { Slice, SliceCaseReducers } from "@reduxjs/toolkit";

export function configureSlice<State, CaseReducers extends SliceCaseReducers<State>>(
  slice: Slice<State, CaseReducers, string>,
  persist: boolean
) {
  return {
    reducer: slice.reducer,
    actions: slice.actions, // if you want to export the actions too
    persist,
  };
}

export const formatValidationErrors = (errorResponse: any): Record<string, string> => {
  const formattedErrors: Record<string, string> = {};

  if (errorResponse?.errors) {
    Object.keys(errorResponse.errors).forEach((key) => {
      // Use the first error message for each key
      formattedErrors[key] = errorResponse.errors[key][0];
    });
  }

  return formattedErrors;
};

export function numberToRomanWithOverline(num: any) {
  const romanNumerals = [
    { value: 1000, numeral: "M" },
    { value: 900, numeral: "CM" },
    { value: 500, numeral: "D" },
    { value: 400, numeral: "CD" },
    { value: 100, numeral: "C" },
    { value: 90, numeral: "XC" },
    { value: 50, numeral: "L" },
    { value: 40, numeral: "XL" },
    { value: 10, numeral: "X" },
    { value: 9, numeral: "IX" },
    { value: 5, numeral: "V" },
    { value: 4, numeral: "IV" },
    { value: 1, numeral: "I" },
  ];

  let result = "";

  // Add overlined numerals for numbers >= 1000
  if (num >= 1000) {
    const overlinedValue = Math.floor(num / 1000);

    num %= 1000;
    result += addOverline(convertToRoman(overlinedValue));
  }

  // Convert the remainder to Roman
  result += convertToRoman(num);

  return result;

  // Helper function to convert numbers < 1000 to Roman
  function convertToRoman(n: any) {
    let roman = "";

    for (const { value, numeral } of romanNumerals) {
      while (n >= value) {
        roman += numeral;
        n -= value;
      }
    }

    return roman;
  }

  // Helper function to add an overline
  function addOverline(roman: any) {
    return roman
      .split("")
      .map((char: any) => char + "\u0305")
      .join("");
  }
}

export const getStepsFromStatus = (statusList: any[], statusId: string) => {
  const statusIndex = statusList.findIndex((step: any) => step.id === statusId);

  return statusList.map((status, index) => ({
    id: status.id,
    code: status.code,
    name: status.name,
    completed: index <= statusIndex,
  }));
};

export const createBlobUrl = (file: File): string => {
  return URL.createObjectURL(file);
};

export const getFileExtension = (file: File | string): string | null => {
  if (file instanceof File) {
    // For File objects, get from name
    return file.name.split(".").pop()?.toLowerCase() || null;
  }

  try {
    const url = new URL(file);

    // Try extracting from pathname
    const path = url.pathname;
    const filename = path.split("/").pop();
    const ext = filename?.split(".").pop();

    if (ext && ext.length <= 5) return ext.toLowerCase(); // Basic validation
  } catch {
    // If not a valid URL (maybe blob or raw string)
    if (file.startsWith("blob:")) {
      return null; // Blob has no extension
    }
  }

  return null;
};

export const formatSubjectType = (type: string | undefined): string => {
  if (!type) return "";

  // Capitalize each word
  return type
    .replace(/([a-z])([A-Z])/g, "$1 $2") // Add space between camelCase or PascalCase
    .replace(/_/g, " ") // Replace underscores with spaces
    .toLowerCase();
  // .replace(/\b\w/g, (char) => char.toUpperCase());
};

export const getWeekdayName = (weekday: any): string => {
  const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  return weekdays[weekday];
};

export const isValidIp = (ip: string): boolean => {
  if (ip.trim() === "*") return true; // wildcard

  const ipv4Regex = /^(25[0-5]|2[0-4][0-9]|1?[0-9]{1,2})(\.(25[0-5]|2[0-4][0-9]|1?[0-9]{1,2})){3}$/;

  const ipv6Regex =
    /^(([0-9a-fA-F]{1,4}:){7}([0-9a-fA-F]{1,4}|:)|::([0-9a-fA-F]{1,4}:){0,5}([0-9a-fA-F]{1,4}|:))$/;

  return ipv4Regex.test(ip) || ipv6Regex.test(ip);
};

export const cleanPhoneNumber = (phone: string): string => {
  return phone
    .replace(/[^\d+]/g, "") // Remove all non-digit and nonplus characters
    .replace(/(?!^)\+/g, ""); // Remove any + that's not at the start
};

// const renderValue = (key: string, value: any) => {
//   // Handle null/undefined
//   if (value == null) return "---";
//
//   // Handle boolean values
//   if (typeof value === "boolean") return value ? "Yes" : "No";
//
//   // Handle nested objects
//   if (typeof value === "object") {
//     // Handle arrays
//     if (Array.isArray(value)) {
//       return value.length ? value.join(", ") : "---";
//     }
//
//     // Handle objects (like car_make, car_model)
//     return value.name || value.title || JSON.stringify(value);
//   }
//
//   // Handle regular values
//   return String(value) || "---";
// };
//
// const getDisplayFields = (data: object, excludedFields: string[]) => {
//   if (!data) return [];
//
//   return Object.entries(data)
//     .filter(([key]) => !excludedFields.includes(key))
//     .map(([key, value]) => ({
//       key,
//       label: formatFieldName(key),
//       value: renderValue(key, value),
//     }));
// };

export function canViewColumn(
  permissions: string[],
  entity: string,
  tableKey: string,
  column: string,
  section: string
) {
  return permissions.includes(`view_${entity}_${tableKey}_${column}_${section}_table`);
}

export function canViewComponent(permissions: any[], entity: string, field: string) {
  const userPermissions = permissions ? permissions.map((p) => p.key.toLowerCase()) : [];

  return userPermissions.includes(`view_${entity}_${field}_component`);
}

export function canEditField(permissions: string[], entity: string, field: string) {
  return permissions.includes(`edit_${entity}_${field}_form_input`);
}

export function canAccessTab(permissions: string[], entity: string, tab: string) {
  return permissions.includes(`access_${entity}_${tab}_tab`);
}

export function canDoGlobalAction(permissions: string[], entity: string, permission: string) {
  return permissions.includes(`action_${entity}_${permission}_global`);
}

export function canViewGlobal(permissions: string[], entity: string, permission: string) {
  return permissions.includes(`view_${entity}_${permission}_global`);
}

export function canChangeInput(
  permissions: string[],
  entity: string,
  formKey: string,
  field: string
) {
  return permissions.includes(`change_${entity}_${formKey}_${field}_form`);
}
