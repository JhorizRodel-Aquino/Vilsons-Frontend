export default function parsePayloadToHTML(payload: any) {
    if (!payload) return '';
    
    const parseObject: any = (obj: any, level = 0) => {
        const entries = Object.entries(obj).filter(([key, value]) => 
            !key.toLowerCase().includes('id') && key.toLowerCase() !== 'hashpwd'
        );
        
        if (entries.length === 0) return '';
        
        return entries.map(([key, value]) => {
            const indent = '  '.repeat(level);
            
            if (Array.isArray(value)) {
                // Filter array items that might have id fields
                const filteredArray = value.map(item => {
                    if (typeof item === 'object' && item !== null) {
                        const filteredItem = Object.fromEntries(
                            Object.entries(item).filter(([k, v]) => 
                                !k.toLowerCase().includes('id') && k.toLowerCase() !== 'hashpwd'
                            )
                        );
                        return Object.keys(filteredItem).length > 0 ? filteredItem : null;
                    }
                    return item;
                }).filter(item => item !== null);
                
                if (filteredArray.length === 0) return '';
                
                return `
${indent}<div class="mb-3">
${indent}  <strong>${key}:</strong>
${indent}  <ul class="ml-4 list-disc list-inside">
${filteredArray.map((item, index) => `
${indent}    <li class="mb-2">
${indent}      <div class="bg-gray-50 border border-gray-200 rounded p-2 mt-1">
${typeof item === 'object' ? parseObject(item, level + 3) : `<span class="text-gray-700">${item}</span>`}
${indent}      </div>
${indent}    </li>`).join('')}
${indent}  </ul>
${indent}</div>`;
            } else if (typeof value === 'object' && value !== null) {
                const filteredObject = Object.fromEntries(
                    Object.entries(value).filter(([k, v]) => 
                        !k.toLowerCase().includes('id') && k.toLowerCase() !== 'hashpwd'
                    )
                );
                
                if (Object.keys(filteredObject).length === 0) return '';
                
                return `
${indent}<div class="mb-2">
${indent}  <strong>${key}:</strong>
${indent}  <div class="ml-4 bg-gray-50 border border-gray-200 rounded p-2 mt-1">
${parseObject(filteredObject, level + 1)}
${indent}  </div>
${indent}</div>`;
            } else {
                return `
${indent}<div class="mb-1">
${indent}  <strong>${key}:</strong> <span class="text-gray-700">${value}</span>
${indent}</div>`;
            }
        }).join('');
    };

    const filteredPayload = Object.fromEntries(
        Object.entries(payload).filter(([key, value]) => 
            !key.toLowerCase().includes('id') && key.toLowerCase() !== 'hashpwd'
        )
    );

    if (Object.keys(filteredPayload).length === 0) {
        return '<div class="bg-white border border-gray-200 rounded-lg p-4 text-sm font-mono text-gray-500">No data to display</div>';
    }

    return `
<div class="bg-white border border-gray-200 rounded-lg p-4 text-sm font-mono">
${parseObject(filteredPayload)}
</div>`;
}