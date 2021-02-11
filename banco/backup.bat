ECHO Fazendo bkp do banco bd_newsite 
c:
cd "C:\Users\rubens\Desktop\pessoal\nodejs\API-node\banco\"
md script
c:
cd "C:\Program Files\MySQL\MySQL Server 5.7\bin" 
mysqldump -u root -p db_newsite > c:\Users\rubens\Desktop\pessoal\nodejs\api-node\banco\db_newsite.sql 