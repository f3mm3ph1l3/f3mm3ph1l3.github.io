// base cloudinary url
var base_cloudinary_url = "https://res.cloudinary.com/ddeqzpbjq/image/upload";

// list of raw urls
var mosaic_tile_urls = [
  base_cloudinary_url + "/v1701216092/compressed/fp_blurred_rad20_mosaic_0_yfpvsv.webp",
  base_cloudinary_url + "/v1701216090/compressed/fp_blurred_rad20_mosaic_1_f43agw.webp",
  base_cloudinary_url + "/v1701216089/compressed/fp_blurred_rad20_mosaic_2_ohpjxb.webp",
  base_cloudinary_url + "/v1701216089/compressed/fp_blurred_rad20_mosaic_3_hedq1y.webp",
  base_cloudinary_url + "/v1701216089/compressed/fp_blurred_rad20_mosaic_4_vbrl7o.webp",
  base_cloudinary_url + "/v1701216088/compressed/fp_blurred_rad20_mosaic_5_xusylf.webp",
  base_cloudinary_url + "/v1701216087/compressed/fp_blurred_rad20_mosaic_6_ztyhja.webp",
  base_cloudinary_url + "/v1701216085/compressed/fp_blurred_rad20_mosaic_7_rk4rkr.webp",
  base_cloudinary_url + "/v1701216085/compressed/fp_blurred_rad20_mosaic_8_rhopfe.webp",
  base_cloudinary_url + "/v1701216085/compressed/fp_blurred_rad20_mosaic_9_kfgwyn.webp",
  base_cloudinary_url + "/v1701216085/compressed/fp_blurred_rad20_mosaic_10_scingf.webp",
  base_cloudinary_url + "/v1701216084/compressed/fp_blurred_rad20_mosaic_11_u2mqar.webp",
  base_cloudinary_url + "/v1701216081/compressed/fp_blurred_rad20_mosaic_12_z2cjta.webp",
  base_cloudinary_url + "/v1701216081/compressed/fp_blurred_rad20_mosaic_13_aqjuyq.webp",
  base_cloudinary_url + "/v1701216081/compressed/fp_blurred_rad20_mosaic_14_wzfmhg.webp",
  base_cloudinary_url + "/v1701216080/compressed/fp_blurred_rad20_mosaic_15_qlknyv.webp",
  base_cloudinary_url + "/v1701216080/compressed/fp_blurred_rad20_mosaic_16_vwwgsw.webp",
  base_cloudinary_url + "/v1701216080/compressed/fp_blurred_rad20_mosaic_17_bj8if2.webp",
  base_cloudinary_url + "/v1701216077/compressed/fp_blurred_rad20_mosaic_18_ifkt0m.webp",
  base_cloudinary_url + "/v1701216077/compressed/fp_blurred_rad20_mosaic_19_u1lrqx.webp",
  base_cloudinary_url + "/v1701216077/compressed/fp_blurred_rad20_mosaic_20_glkags.webp",
  base_cloudinary_url + "/v1701216076/compressed/fp_blurred_rad20_mosaic_21_vn8zn9.webp",
  base_cloudinary_url + "/v1701216076/compressed/fp_blurred_rad20_mosaic_22_eicseb.webp",
  base_cloudinary_url + "/v1701216074/compressed/fp_blurred_rad20_mosaic_23_vyfqux.webp",
  base_cloudinary_url + "/v1701216073/compressed/fp_blurred_rad20_mosaic_24_thlroo.webp",
  base_cloudinary_url + "/v1701216073/compressed/fp_blurred_rad20_mosaic_25_z37wvx.webp",
  base_cloudinary_url + "/v1701216072/compressed/fp_blurred_rad20_mosaic_26_thmcsk.webp",
  base_cloudinary_url + "/v1701216072/compressed/fp_blurred_rad20_mosaic_27_up93zd.webp",
  base_cloudinary_url + "/v1701216070/compressed/fp_blurred_rad20_mosaic_28_ahtdyj.webp",
  base_cloudinary_url + "/v1701216070/compressed/fp_blurred_rad20_mosaic_29_b6porx.webp",
  base_cloudinary_url + "/v1701216069/compressed/fp_blurred_rad20_mosaic_30_cra39l.webp",
  base_cloudinary_url + "/v1701216070/compressed/fp_blurred_rad20_mosaic_31_p4522y.webp",
  base_cloudinary_url + "/v1701216069/compressed/fp_blurred_rad20_mosaic_32_tjote7.webp",
  base_cloudinary_url + "/v1701216069/compressed/fp_blurred_rad20_mosaic_33_so6elk.webp",
  base_cloudinary_url + "/v1701216068/compressed/fp_blurred_rad20_mosaic_34_pfp8nv.webp",
  base_cloudinary_url + "/v1701216068/compressed/fp_blurred_rad20_mosaic_35_x4w1ip.webp"
];

// selection random matrix row/column
function random_matrix_cell(rows, columns) {
  return [Math.floor(Math.random()*rows), Math.floor(Math.random()*columns)]
}

// creates mosaic tiles matrix
function build_tiles_matrix(rows, columns) {
  // initialize outer list
  let tile_matrix = [];

  // populate matrix
  for (let i = 0; i < rows; i++) {
    // create new row
    let matrix_row = [];

    // populate row
    for (let j = i*rows; j < (i*rows)+columns; j++) {
      matrix_row.push(mosaic_tile_urls[j]);
    }

    // add new row to matrix
    tile_matrix.push(matrix_row);
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
  let tile_matrix = build_tiles_matrix(6, 6);

  // get randowm row/column pair
  let [row, column] = random_matrix_cell(6, 6);

  // get random URL
  let random_tile_url = tile_matrix[row][column];

  // preload it
  preload_mosaic_tile(random_tile_url);

  // get style element
  let style_tag = document.getElementById("header-style");

  // update with randomly chosen mosaic tile URL
  style_tag.sheet.cssRules[0].style.backgroundImage = `url(${random_tile_url})`;
}
