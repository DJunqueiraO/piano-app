type DownloadProps = {
    name: string
    blobParts?: BlobPart[], 
    options?: BlobPropertyBag
}

export function download(
    props: DownloadProps
) {
    const a = document.createElement('a')
    const url = URL.createObjectURL(new Blob(props.blobParts, props.options))
    a.href = url
    a.download = props.name
    a.click()
    URL.revokeObjectURL(url)
}