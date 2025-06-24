// Mock for next-intl
const mockUseTranslations = (namespace) => {
	return (key, values) => {
	  // Simple mock that returns the key with values interpolated
	  if (values) {
		return `${key} ${JSON.stringify(values)}`;
	  }
	  return key;
	};
  };

  const mockUseFormatter = () => ({
	dateTime: (date, options) => date.toLocaleDateString(),
	number: (number, options) => number.toString(),
	relativeTime: (date, options) => 'relative time',
  });

  const mockGetTranslator = async (locale) => {
	return (key, values) => {
	  if (values) {
		return `${key} ${JSON.stringify(values)}`;
	  }
	  return key;
	};
  };

  const mockNextIntlClientProvider = ({ children }) => children;

  module.exports = {
	useTranslations: mockUseTranslations,
	useFormatter: mockUseFormatter,
	getTranslator: mockGetTranslator,
	NextIntlClientProvider: mockNextIntlClientProvider,
	createTranslator: () => mockGetTranslator(),
  };