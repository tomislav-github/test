import { useState } from 'react';

const useFormattedData = (data) => {

    const [formatted, setFormatted] = useState(data);

    const search = (searchInput) => {
        const filteredData = formatted.filter(
            (data) =>
                JSON.stringify(data)
                    .toLowerCase()
                    .indexOf(searchInput.toLowerCase()) !== -1
        );

        setFormatted([...filteredData]);
    };

    const filter = (filterFunc) => {
        const filteredData = formatted.filter(filterFunc);

        setFormatted([...filteredData]);
    };

    const sortBy = (field) => {
        const sortedData = formatted.sort((a, b) => (a[field] > b[field] ? 1 : -1));

        setFormatted([...sortedData]);
    };

    return { formatted, search, filter, sortBy };
}

export default useFormattedData;