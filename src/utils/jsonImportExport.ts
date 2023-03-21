export const exportToJSON = (data: []): void => {
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `calendar.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};

export async function importFromJsonFile(): Promise<any> {
    const input = document.createElement('input');
    input.type = 'file';

    return new Promise((resolve, reject) => {
        input.onchange = (e: Event) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (!file) {
            reject('No file selected');
            return;
        }

        const reader = new FileReader();
        reader.readAsText(file, 'UTF-8');
        reader.onload = (evt: ProgressEvent<FileReader>) => {
            try {
            const json = JSON.parse(evt.target?.result as string);
            resolve(json);
            } catch (error) {
            reject(`Invalid JSON file: ${error.message}`);
            }
        };
        reader.onerror = () => {
            reject('Error reading file');
        };
        };
        input.click();
    });
}