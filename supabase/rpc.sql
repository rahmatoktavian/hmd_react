------------------------------------------------------------------------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION rekap_buku_perkategori()
  	returns TABLE (nama varchar, total_buku bigint) AS
$func$
 	select kategori_buku.nama, count(buku.id) AS total_buku
	from buku
	join kategori_buku on buku.kategori_id = kategori_buku.id
	group by kategori_buku.nama
	order by kategori_buku.nama
$func$ LANGUAGE sql;
------------------------------------------------------------------------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION rekap_peminjaman_perhari()
  	returns TABLE (tanggal_pinjam date, total_pinjam bigint) AS
$func$
 	select tanggal_pinjam, count(id) AS total_pinjam
	from peminjaman
	group by tanggal_pinjam
	order by tanggal_pinjam
$func$ LANGUAGE sql;
------------------------------------------------------------------------------------------------------------------------------------------------
