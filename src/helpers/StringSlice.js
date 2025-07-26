export default function StringSlice(data, stringEnd) {
  return data.length > stringEnd ? data.slice(1, stringEnd) + "..." : data;
}
