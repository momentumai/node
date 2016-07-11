/* management */
SET SQL_SAFE_UPDATES = 0;

/* insert category 'NONE' */
INSERT INTO category (team_id, name, parent) values (0, 'NONE', 0);
UPDATE category SET id = 0 WHERE id = LAST_INSERT_ID();

/* drop tables */
DROP TABLE content;
DROP TABLE share;
DROP TABLE source;

/* content_id migration */
ALTER TABLE campaign MODIFY content_id VARCHAR(128);
ALTER TABLE promotion MODIFY content_id VARCHAR(128);
ALTER TABLE alert MODIFY content_id VARCHAR(128);

/* category migrate */

/* alert */
CALL migrateCategory('alert');

/* campaign */
CALL migrateCategory('campaign');

/* fb_campaign */
/* we have a duplication */
ALTER TABLE fb_campaign DROP INDEX ux_fb_campaign_team_id_cat1_cat2_cat3;
DELETE FROM fb_campaign WHERE team_id = 5 AND cat1 = 0 AND cat2 = 0 AND cat3 = 0 AND adaccount = 'act_1136171943066150' LIMIT 1;
DELETE FROM fb_campaign WHERE team_id = 10 AND cat1 = 0 AND cat2 = 0 AND cat3 = 0 AND adaccount = 'act_544193509077985' LIMIT 1;
CALL migrateCategory('fb_campaign');
ALTER TABLE fb_campaign ADD UNIQUE INDEX ux_fb_campaign_team_id_cat1_cat2_cat3
(`team_id`, `cat1`, `cat2`, `cat3`, `adaccount`);


/* promotion */
CALL migrateCategory('promotion');

/* rule */
CALL migrateCategory('rule');


/* team_user_data */
UPDATE
team_user_data
INNER JOIN
(
SELECT t1.*,
	c1.name as cat1,
	c2.name as cat2,
	c3.name as cat3,
    CONCAT('["', c1.name, '","', c2.name, '","', c3.name, '"]') as update_field
FROM (
	SELECT *,
		substring(team_user_data.`value`, 2, length(team_user_data.`value`) - 2) as filter
	FROM team_user_data
    WHERE
    `key` = 'filter'
) t1
LEFT JOIN category as c1
	ON c1.id = REPLACE(SUBSTRING(SUBSTRING_INDEX(t1.filter, ',', 1),LENGTH(SUBSTRING_INDEX(t1.filter, ',', 1 -1)) + 1),',', '')
LEFT JOIN category as c2
	ON c2.id = REPLACE(SUBSTRING(SUBSTRING_INDEX(t1.filter, ',', 2),LENGTH(SUBSTRING_INDEX(t1.filter, ',', 2 -1)) + 1),',', '')
LEFT JOIN category as c3
	ON c3.id = REPLACE(SUBSTRING(SUBSTRING_INDEX(t1.filter, ',', 3),LENGTH(SUBSTRING_INDEX(t1.filter, ',', 3 -1)) + 1),',', '')
    ) t2
ON
	team_user_data.team_id = t2.team_id AND
	team_user_data.user_id = t2.user_id AND
	team_user_data.`key` = t2.`key`
SET
team_user_data.`value` = t2.update_field;
