async function test(context) {
    const nodeID = context.add('https://data-public.threedy.io/testdata/basic/sphere.osb')
    await context.setProperty(nodeID, "enabled", true)
    await context.setProperty(nodeID, "appearanceURI", "00ffac");
}
