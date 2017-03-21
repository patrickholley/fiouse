update local_session
set temp_fetcher = null
where temp_fetcher = $1;