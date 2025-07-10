import dayjsLib from "dayjs";
import "dayjs/locale/pt-br"; // Import Portuguese locale
import relativeTime from "dayjs/plugin/relativeTime";

dayjsLib.locale("pt-br"); // Set locale to Portuguese (Brazil)
dayjsLib.extend(relativeTime);

export const dayjs = dayjsLib;