
actors     directors_genres  movies_directors  roles
directors  movies            movies_genres

select name, year from movies where year =1977;
select count(*) as total from movies where year=1977;

select count(*) from movies where year= 1982;

select * from actors where last_name like '%stack%';
select count(*) from actors where last_name like '%stack%';

select first_name,last_name, count(*) as count
from actors
group by lower(first_name), lower(last_name)
order by count desc
limit 10;

select a.first_name, a.last_name, count(*) as total
from actors as a
join roles as r 
on a.id = r.actor_id
group by a.id
order by total desc
limit 100;

select genre, count (*) as total
from movies_genres
group by genre
order by total asc;

select a.first_name, a.last_name 
from actors as a
join roles as r
on a.id = r.actor_id
join movies as m
on r.movie_id = m.id
where m.name = 'Braveheart' and m.year = 1995
order by a.last_name;


select d.first_name, d.last_name, m.name, m.year
from directors as d
join movies_directors as md on d.id = md.director_id
join movies as m on m.id = md.movie_id
join movies_genres as mg on m.id = mg.movie_id
where mg.genre = 'Film-Noir' and m.year % 4 = 0
order by m.name;

select a.first_name, a.last_name, m.name
from actors as a
join roles as r on r.actor_id = a.id
join movies as m on m.id = r.movie_id
join movies_genres as mg on mg.movie_id = m.id
where mg.genre = 'Drama' and m.id in (
  select r.movie_id
  from roles as r
  join actors as a on r.actor_id = a.id
  where first_name = 'Kevin' and last_name = 'Bacon'
)
and (a.first_name || ' '|| a.last_name != 'Kevin Bacon');


select * from actors where id in(
  select r.actor_id from roles as r 
  join movies as m on r.movie_id = m.id
  where m.year < 1900
) and id in(
   select r.actor_id from roles as r 
  join movies as m on r.movie_id = m.id
  where m.year > 2000
);

select a.first_name, a.last_name, count(distinct(r.role)) as total
from actors as a
join roles as r on a.id = r.actor_id
join movies as m on m.id = r.movie_id
where m.year > 1990
group by r.movie_id, r.actor_id
having total > 5;

select year, count (distinct id)
from movies where id not in(
  select r.movie_id 
  from roles as r
  join actors as a on r.actor_id = a.id
  where a.gender = 'M'
)
group by year;




