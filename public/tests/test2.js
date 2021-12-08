async function test(context) {
    const rootID = context.add({ label: "Root Node" })

    context.add({
        label: `Cube 1`,
        parentID: rootID,
        dataURI: 'https://data-public.threedy.io/testdata/basic/cube.osb',
        initialProperties: {
            localTransform: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -2, 2, 0, 1]
        }
    })

    context.add({
        label: `Cube 2`,
        parentID: rootID,
        dataURI: 'https://data-public.threedy.io/testdata/basic/cube.osb',
        initialProperties: {
            localTransform: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 2, 0, 0, 1]
        }
    })

    await context.setProperty(rootID, "enabled", true)
    await context.setProperty(rootID, "appearanceURI", "00ffac");
}