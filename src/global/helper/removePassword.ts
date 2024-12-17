export const sanitizeSensitiveFields = <T>(data: T | T[]): T | T[] => {
  const removePassword = (record: any) => {
    if (record && typeof record === "object" && "password" in record) {
      const { password, ...rest } = record;
      return rest;
    }
    return record;
  };

  if (Array.isArray(data)) {
    return data.map(removePassword);
  }
  return removePassword(data);
};
