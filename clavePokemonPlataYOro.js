        function ClavePokemonPlataYOro(nombre, id, dinero) {
            const RESPUESTAERROR = undefined;
            const DIVISORBYTE = 256;
            const USHORTMAX = 65535;
            const A = 65;
            const a = 97;
            const ANintendo = 128;
            const aNintendo = 160;
            const CAMPOSNOMBREMAX = 5;

            var id;
            var dinero;
            var clave = 0;
            var i;
            var c;
            if (id != undefined && dinero != undefined && nombre != undefined && nombre != "") {
                try {
                    id = parseInt(id);
                    dinero = parseInt(dinero);
                    if (id > 0) {
                        for (i = 0; i < nombre.length && i < CAMPOSNOMBREMAX; i++) {
                            c = nombre.charCodeAt(i);
                            if (c >= a)
                                clave += c - a + aNintendo;
                            else
                                clave += c - A + ANintendo;
                        }


                        id %= USHORTMAX;

                        clave += Math.floor(id / DIVISORBYTE) + (id % DIVISORBYTE);


                        dinero %= USHORTMAX;

                        clave += Math.floor(dinero / DIVISORBYTE) + (dinero % DIVISORBYTE);
                    } else clave = RESPUESTAERROR;
                } catch {
                    clave = RESPUESTAERROR;
                }
            } else clave = RESPUESTAERROR;

            return clave;
        }