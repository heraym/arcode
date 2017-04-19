CREATE TABLE CATEGORIA 
(
  ID VARCHAR2(20 BYTE) NOT NULL 
, CATEGORIA VARCHAR2(50 BYTE) 
, CONSTRAINT CATEGORIA_PK PRIMARY KEY 
  (
    ID 
  )
  USING INDEX 
  (
      CREATE UNIQUE INDEX CATEGORIA_PK ON CATEGORIA (ID ASC) 
      LOGGING 
      TABLESPACE USERS 
      PCTFREE 10 
      INITRANS 2 
      STORAGE 
      ( 
        INITIAL 65536 
        NEXT 1048576 
        MINEXTENTS 1 
        MAXEXTENTS UNLIMITED 
        BUFFER_POOL DEFAULT 
      ) 
      NOPARALLEL 
  )
  ENABLE 
) 
LOGGING 
TABLESPACE USERS 
PCTFREE 10 
INITRANS 1 
STORAGE 
( 
  INITIAL 65536 
  NEXT 1048576 
  MINEXTENTS 1 
  MAXEXTENTS UNLIMITED 
  BUFFER_POOL DEFAULT 
) 
NOCOMPRESS;

CREATE TABLE HISTORIALCOMPRAS 
(
  ANIO NUMBER NOT NULL 
, IMES NUMBER NOT NULL 
, PRODUCTO VARCHAR2(20 BYTE) NOT NULL 
, CANTIDAD NUMBER 
, CONSTRAINT HISTORIALCOMPRAS_PK PRIMARY KEY 
  (
    ANIO 
  , IMES 
  , PRODUCTO 
  )
  USING INDEX 
  (
      CREATE UNIQUE INDEX HISTORIALCOMPRAS_PK ON HISTORIALCOMPRAS (ANIO ASC, IMES ASC, PRODUCTO ASC) 
      LOGGING 
      TABLESPACE USERS 
      PCTFREE 10 
      INITRANS 2 
      STORAGE 
      ( 
        INITIAL 65536 
        NEXT 1048576 
        MINEXTENTS 1 
        MAXEXTENTS UNLIMITED 
        BUFFER_POOL DEFAULT 
      ) 
      NOPARALLEL 
  )
  ENABLE 
) 
LOGGING 
TABLESPACE USERS 
PCTFREE 10 
INITRANS 1 
STORAGE 
( 
  INITIAL 65536 
  NEXT 1048576 
  MINEXTENTS 1 
  MAXEXTENTS UNLIMITED 
  BUFFER_POOL DEFAULT 
) 
NOCOMPRESS;

CREATE TABLE PRODUCTOS 
(
  ID VARCHAR2(10 BYTE) NOT NULL 
, NOMBRE VARCHAR2(50 BYTE) 
, DESCRIPCION VARCHAR2(200 BYTE) 
, PRECIO NUMBER 
, CATEGORIA VARCHAR2(20 BYTE) 
, STOCK NUMBER 
, CONSTRAINT PRODUCTOS_PK PRIMARY KEY 
  (
    ID 
  )
  USING INDEX 
  (
      CREATE UNIQUE INDEX PRODUCTOS_PK ON PRODUCTOS (ID ASC) 
      LOGGING 
      TABLESPACE USERS 
      PCTFREE 10 
      INITRANS 2 
      STORAGE 
      ( 
        INITIAL 65536 
        NEXT 1048576 
        MINEXTENTS 1 
        MAXEXTENTS UNLIMITED 
        BUFFER_POOL DEFAULT 
      ) 
      NOPARALLEL 
  )
  ENABLE 
) 
LOGGING 
TABLESPACE USERS 
PCTFREE 10 
INITRANS 1 
STORAGE 
( 
  INITIAL 65536 
  NEXT 1048576 
  MINEXTENTS 1 
  MAXEXTENTS UNLIMITED 
  BUFFER_POOL DEFAULT 
) 
NOCOMPRESS;

CREATE TABLE STOCK 
(
  PRODUCTO VARCHAR2(20 BYTE) NOT NULL 
, CANTIDAD NUMBER 
, DEPOSITO VARCHAR2(20 BYTE) NOT NULL 
, CONSTRAINT STOCK_PK PRIMARY KEY 
  (
    PRODUCTO 
  , DEPOSITO 
  )
  USING INDEX 
  (
      CREATE UNIQUE INDEX STOCK_PK ON STOCK (PRODUCTO ASC, DEPOSITO ASC) 
      LOGGING 
      TABLESPACE USERS 
      PCTFREE 10 
      INITRANS 2 
      STORAGE 
      ( 
        INITIAL 65536 
        NEXT 1048576 
        MINEXTENTS 1 
        MAXEXTENTS UNLIMITED 
        BUFFER_POOL DEFAULT 
      ) 
      NOPARALLEL 
  )
  ENABLE 
) 
LOGGING 
TABLESPACE USERS 
PCTFREE 10 
INITRANS 1 
STORAGE 
( 
  INITIAL 65536 
  NEXT 1048576 
  MINEXTENTS 1 
  MAXEXTENTS UNLIMITED 
  BUFFER_POOL DEFAULT 
) 
NOCOMPRESS;

CREATE UNIQUE INDEX CATEGORIA_PK ON CATEGORIA (ID ASC) 
LOGGING 
TABLESPACE USERS 
PCTFREE 10 
INITRANS 2 
STORAGE 
( 
  INITIAL 65536 
  NEXT 1048576 
  MINEXTENTS 1 
  MAXEXTENTS UNLIMITED 
  BUFFER_POOL DEFAULT 
) 
NOPARALLEL;

CREATE UNIQUE INDEX HISTORIALCOMPRAS_PK ON HISTORIALCOMPRAS (ANIO ASC, IMES ASC, PRODUCTO ASC) 
LOGGING 
TABLESPACE USERS 
PCTFREE 10 
INITRANS 2 
STORAGE 
( 
  INITIAL 65536 
  NEXT 1048576 
  MINEXTENTS 1 
  MAXEXTENTS UNLIMITED 
  BUFFER_POOL DEFAULT 
) 
NOPARALLEL;

CREATE UNIQUE INDEX PRODUCTOS_PK ON PRODUCTOS (ID ASC) 
LOGGING 
TABLESPACE USERS 
PCTFREE 10 
INITRANS 2 
STORAGE 
( 
  INITIAL 65536 
  NEXT 1048576 
  MINEXTENTS 1 
  MAXEXTENTS UNLIMITED 
  BUFFER_POOL DEFAULT 
) 
NOPARALLEL;

CREATE UNIQUE INDEX STOCK_PK ON STOCK (PRODUCTO ASC, DEPOSITO ASC) 
LOGGING 
TABLESPACE USERS 
PCTFREE 10 
INITRANS 2 
STORAGE 
( 
  INITIAL 65536 
  NEXT 1048576 
  MINEXTENTS 1 
  MAXEXTENTS UNLIMITED 
  BUFFER_POOL DEFAULT 
) 
NOPARALLEL;

ALTER TABLE PRODUCTOS
ADD CONSTRAINT PRODUCTOS_FK1 FOREIGN KEY
(
  CATEGORIA 
)
REFERENCES CATEGORIA
(
  ID 
)
ENABLE;

CREATE PROCEDURE CONSOLIDARSTOCK AS 
BEGIN
  DBMS_LOCK.SLEEP(10);
END CONSOLIDARSTOCK;
/
