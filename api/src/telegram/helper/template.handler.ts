/* eslint-disable prettier/prettier */
export function useTemplate(template: string, ...itemsToBeReplaced): string {
  return template.replace(/{(\d+)}/g, (match, number) => {
    return itemsToBeReplaced[number] || match;
  });
}
