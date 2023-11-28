// base cloudinary url
var base_cloudinary_url = "https://res.cloudinary.com/ddeqzpbjq/image/upload";

// list of raw urls
var mosaic_tile_urls = [
  base_cloudinary_url + "/v1701200933/mosaic_tiles_66/fp_blurred_rad20_mosaic_0_liw3f1.jpg",
  base_cloudinary_url + "/v1701200932/mosaic_tiles_66/fp_blurred_rad20_mosaic_1_hkjcxj.jpg",
  base_cloudinary_url + "/v1701200931/mosaic_tiles_66/fp_blurred_rad20_mosaic_2_kyjz36.jpg",
  base_cloudinary_url + "/v1701200932/mosaic_tiles_66/fp_blurred_rad20_mosaic_3_chqwko.jpg",
  base_cloudinary_url + "/v1701200931/mosaic_tiles_66/fp_blurred_rad20_mosaic_4_r8tdrb.jpg",
  base_cloudinary_url + "/v1701200928/mosaic_tiles_66/fp_blurred_rad20_mosaic_5_cpegpx.jpg",
  base_cloudinary_url + "/v1701200922/mosaic_tiles_66/fp_blurred_rad20_mosaic_6_vttx5q.jpg",
  base_cloudinary_url + "/v1701200918/mosaic_tiles_66/fp_blurred_rad20_mosaic_7_e6kl1g.jpg",
  base_cloudinary_url + "/v1701200918/mosaic_tiles_66/fp_blurred_rad20_mosaic_8_daaivz.jpg",
  base_cloudinary_url + "/v1701200915/mosaic_tiles_66/fp_blurred_rad20_mosaic_9_jw7okm.jpg",
  base_cloudinary_url + "/v1701200917/mosaic_tiles_66/fp_blurred_rad20_mosaic_10_gljr2u.jpg",
  base_cloudinary_url + "/v1701200911/mosaic_tiles_66/fp_blurred_rad20_mosaic_11_lju4ik.jpg",
  base_cloudinary_url + "/v1701200906/mosaic_tiles_66/fp_blurred_rad20_mosaic_12_fj1a4d.jpg",
  base_cloudinary_url + "/v1701200904/mosaic_tiles_66/fp_blurred_rad20_mosaic_13_g4okr8.jpg",
  base_cloudinary_url + "/v1701200903/mosaic_tiles_66/fp_blurred_rad20_mosaic_14_pg1ioz.jpg",
  base_cloudinary_url + "/v1701200900/mosaic_tiles_66/fp_blurred_rad20_mosaic_15_sddbza.jpg",
  base_cloudinary_url + "/v1701200899/mosaic_tiles_66/fp_blurred_rad20_mosaic_16_gwwmce.jpg",
  base_cloudinary_url + "/v1701200897/mosaic_tiles_66/fp_blurred_rad20_mosaic_17_muygfi.jpg",
  base_cloudinary_url + "/v1701200888/mosaic_tiles_66/fp_blurred_rad20_mosaic_18_jr43io.jpg",
  base_cloudinary_url + "/v1701200888/mosaic_tiles_66/fp_blurred_rad20_mosaic_19_us9nju.jpg",
  base_cloudinary_url + "/v1701200887/mosaic_tiles_66/fp_blurred_rad20_mosaic_20_qrcy1y.jpg",
  base_cloudinary_url + "/v1701200886/mosaic_tiles_66/fp_blurred_rad20_mosaic_21_sgubkz.jpg",
  base_cloudinary_url + "/v1701200884/mosaic_tiles_66/fp_blurred_rad20_mosaic_22_xdif2l.jpg",
  base_cloudinary_url + "/v1701200879/mosaic_tiles_66/fp_blurred_rad20_mosaic_23_bhls7o.jpg",
  base_cloudinary_url + "/v1701200872/mosaic_tiles_66/fp_blurred_rad20_mosaic_24_l2ckw9.jpg",
  base_cloudinary_url + "/v1701200874/mosaic_tiles_66/fp_blurred_rad20_mosaic_25_ktwmny.jpg",
  base_cloudinary_url + "/v1701200873/mosaic_tiles_66/fp_blurred_rad20_mosaic_26_pxznlb.jpg",
  base_cloudinary_url + "/v1701200868/mosaic_tiles_66/fp_blurred_rad20_mosaic_27_adgo6t.jpg",
  base_cloudinary_url + "/v1701200871/mosaic_tiles_66/fp_blurred_rad20_mosaic_28_jo2moq.jpg",
  base_cloudinary_url + "/v1701200865/mosaic_tiles_66/fp_blurred_rad20_mosaic_29_cfnezx.jpg",
  base_cloudinary_url + "/v1701200858/mosaic_tiles_66/fp_blurred_rad20_mosaic_30_yi0mby.jpg",
  base_cloudinary_url + "/v1701200858/mosaic_tiles_66/fp_blurred_rad20_mosaic_31_k8s6mm.jpg",
  base_cloudinary_url + "/v1701200858/mosaic_tiles_66/fp_blurred_rad20_mosaic_32_kxqbip.jpg",
  base_cloudinary_url + "/v1701200856/mosaic_tiles_66/fp_blurred_rad20_mosaic_33_synjuz.jpg",
  base_cloudinary_url + "/v1701200855/mosaic_tiles_66/fp_blurred_rad20_mosaic_34_r5jbk0.jpg",
  base_cloudinary_url + "/v1701200852/mosaic_tiles_66/fp_blurred_rad20_mosaic_35_zhhokw.jpg"
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
