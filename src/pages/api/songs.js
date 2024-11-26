export default function handler(req, res) {
    const songs = [
      {
        Genres: "",
        Title: "I Want It That Way",
        Artists: "Backstreet Boys",
        Quality: "",
        Transpose: "",
        Link: "https://www.sheetmusicdirect.com/en-US/se/ID_No/31326/Product.aspx",
      },
      {
        Genres: "Musical‎",
        Title: "Tell Me On A Sunday (Song and Dance)",
        Artists: "Andrew Lloyd Webber",
        Quality: "★",
        Transpose: "",
        Link: "https://www.sheetmusicdirect.com/en-US/se/ID_No/21437/Product.aspx",
      },
      // Add the remaining records...
    ];
  
    res.status(200).json(songs);
  }
  