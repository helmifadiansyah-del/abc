function fibonacci(n) {
  if (n < 0) {
    throw new Error('Input harus bilangan bulat non-negatif');
  }
  if (n === 0) {
    return [0];
  }
  if (n === 1) {
    return [0, 1];
  }

  const prevSeries = fibonacci(n - 1);
  const nextValue = prevSeries[prevSeries.length - 1] + prevSeries[prevSeries.length - 2];
  return [...prevSeries, nextValue];
}


// Jangan hapus kode di bawah ini!
export default fibonacci;
