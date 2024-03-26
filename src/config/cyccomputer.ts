export const getUrl = (type: string, page?: string) => {
  switch (type) {
    case "getGraphicCards":
      return `https://cyccomputer.pe/781-tarjetas-graficas?page=${page}`;
    default:
      return "";
  }
};
