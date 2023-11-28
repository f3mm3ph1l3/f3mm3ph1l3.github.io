// base cloudinary url
var base_cloudinary_url = "https://res.cloudinary.com/ddeqzpbjq/image/upload";

// list of raw urls
var mosaic_tile_urls = [
  base_cloudinary_url + "/v1701123698/fp_blurred_rad20_mosaic_0_gkav3r.jpg",
  base_cloudinary_url + "/v1701123696/fp_blurred_rad20_mosaic_1_gwqnhg.jpg",
  base_cloudinary_url + "/v1701123702/fp_blurred_rad20_mosaic_2_nr9qzr.jpg",
  base_cloudinary_url + "/v1701123739/fp_blurred_rad20_mosaic_3_ftshda.jpg",
  base_cloudinary_url + "/v1701123753/fp_blurred_rad20_mosaic_4_jehlwg.jpg",
  base_cloudinary_url + "/v1701123702/fp_blurred_rad20_mosaic_5_iacx5i.jpg",
  base_cloudinary_url + "/v1701123761/fp_blurred_rad20_mosaic_6_nah7nd.jpg",
  base_cloudinary_url + "/v1701123704/fp_blurred_rad20_mosaic_7_o4zqsz.jpg",
  base_cloudinary_url + "/v1701123702/fp_blurred_rad20_mosaic_8_zsmaud.jpg",
  base_cloudinary_url + "/v1701123725/fp_blurred_rad20_mosaic_9_v9rfwc.jpg",
  base_cloudinary_url + "/v1701123738/fp_blurred_rad20_mosaic_10_wrffva.jpg",
  base_cloudinary_url + "/v1701123742/fp_blurred_rad20_mosaic_11_zj6bk0.jpg",
  base_cloudinary_url + "/v1701123743/fp_blurred_rad20_mosaic_12_inrees.jpg",
  base_cloudinary_url + "/v1701123733/fp_blurred_rad20_mosaic_13_a0ahcd.jpg",
  base_cloudinary_url + "/v1701123756/fp_blurred_rad20_mosaic_14_gxjros.jpg",
  base_cloudinary_url + "/v1701123761/fp_blurred_rad20_mosaic_15_zixofx.jpg",
];

// selection random matrix row/column
function random_matrix_cell() {
  return [Math.floor(Math.random()*4), Math.floor(Math.random()*4)]
}

// creates mosaic tiles matrix
function build_tiles_matrix() {
  // initialize outer list
  let tile_matrix = [];

  // populate matrix
  for (let i = 0; i < 4; i++) {
    // create new row
    let row = [];

    // populate row
    for (let j = i*4; j < (i*4)+4; j++) {
      row.push(mosaic_tile_urls[j]);
    }

    // add new row to matrix
    tile_matrix.push(row);
  }

  // get matrix
  return tile_matrix;
}

// setup a single mosaick tile link
function preload_mosaic_tile(url) {
  // get new link
  let link = document.createElement("link");

  // update link attributes
  link.rel = "preload";
  link.href = url;
  link.as = "image";

  // add to head
  document.head.appendChild(link);
}

// setup all preload links
function preload_all_tiles() {
  // populate head with links
  for (let i = 0; i < mosaic_tile_urls.length; i++) {
    // preload tile for index
    preload_mosaic_tile(mosaic_tile_urls[i]);
  }
}

// update body background
function update_background() {
  // get tile matrix
  let tile_matrix = build_tiles_matrix();

  // get randowm row/column pair
  let [row, column] = random_matrix_cell();

  // get random URL
  let random_tile_url = tile_matrix[row][column];

  // preload it
  preload_mosaic_tile(random_tile_url);

  // get style element
  let style_tag = document.getElementById("header-style");

  // update with randomly chosen mosaic tile URL
  style_tag.sheet.cssRules[0].style.backgroundImage = `url(${random_tile_url})`;
}
