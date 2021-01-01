// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function filterByTerm(inputArr: unknown[], searchTerm: string | RegExp) {
  if (!searchTerm) throw Error('searchTerm cannot be empty');
  if (!inputArr.length) throw Error('inputArr cannot be empty');
  const regex = new RegExp(searchTerm, 'i');
  return inputArr.filter((arrayElement: { url: string; }) => arrayElement.url.match(regex));
}
