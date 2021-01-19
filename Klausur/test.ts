async function communicate2(_url: RequestInfo): Promise<string> {
    console.log("rest");
    let response: Response = await fetch(_url);
    let allDataFetched: string = JSON.stringify(await response.json());
    console.log(allDataFetched);
    return allDataFetched;
}

communicate2("https://yannick4815.github.io/GIS-WiSe-2020-2021/Aufgabe_2_3/data.json")
        .then((allDataFetched) =>
            fillSite2()
            //console.log("allDataFetched")

        );

function fillSite2(): void{
    console.log("_allDataFetched");
}