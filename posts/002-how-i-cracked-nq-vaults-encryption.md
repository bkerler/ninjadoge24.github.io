#How I cracked NQ Vault's "encryption"

Google it up if you want to: NQ Vault. I don't wanna link it form here. It's got some really nice ratings on the Play Store.

>★ _The most popular app with over 30 million users worldwide_

>★ _CTIA - "The Best App of CTIA by the Techlicious 2012 Best of CTIA Awards"_

>★ _PC Magazine - "PC Magazine Best Apps"_

>★ _TRUSTe - Received "TRUSTe Privacy Seal"_

>★ _Global Mobile Internet Conference App Space - "A top 50 app"_

![NQ Vault](assets/img/nq-vault.png "NQ Vault")

###Day 1

I made a 1x1px png [test.png] in GIMP and ran `echo NINJADOGE24 >> test.png` and encrypted it in NQ Vault v6.1.00.22 with a simple password `2424`.

The original file, test.png:

    0000000: 8950 4e47 0d0a 1a0a 0000 000d 4948 4452  .PNG........IHDR
    0000010: 0000 0001 0000 0001 0802 0000 0090 7753  ..............wS
    0000020: de00 0000 0970 4859 7300 0003 b100 0003  .....pHYs.......
    0000030: b101 f583 ed49 0000 0007 7449 4d45 07df  .....I....tIME..
    0000040: 0401 0319 3a3d ca0b 0c00 0000 0c69 5458  ....:=.......iTX
    0000050: 7443 6f6d 6d65 6e74 0000 0000 00bc aeb2  tComment........
    0000060: 9900 0000 0f49 4441 5408 1d01 0400 fbff  .....IDAT.......
    0000070: 00ff 0000 0301 0100 c706 926f 0000 0000  ...........o....
    0000080: 4945 4e44 ae42 6082 4e49 4e4a 4144 4f47  IEND.B`.NINJADOG
    0000090: 4532 340a                                E24.

Vault's sqlite db told me where to find the encrypted file.

![NQ Vault db](assets/img/nq-vault-db.png "NQ Vault db")

The encrypted file, 1427858907178.png:

    0000000: 8d54 4a43 090e 1e0e 0404 0409 4d4c 4056  .TJC........ML@V
    0000010: 0404 0405 0404 0405 0c06 0404 0494 7357  ..............sW
    0000020: da04 0404 0d74 4c5d 7704 0407 b504 0407  .....tL]w.......
    0000030: b505 f187 e94d 0404 0403 704d 4941 03db  .....M....pMIA..
    0000040: 0005 071d 3e39 ce0f 0804 0404 086d 505c  ....>9.......mP\
    0000050: 7047 6b69 6961 6a70 0404 0404 04b8 aab6  pGkiiajp........
    0000060: 9d04 0404 0b4d 4045 500c 1905 0004 fffb  .....M@EP.......
    0000070: 04fb 0404 0705 0504 c302 966b 0404 0404  ...........k....
    0000080: 4945 4e44 ae42 6082 4e49 4e4a 4144 4f47  IEND.B`.NINJADOG
    0000090: 4532 340a                                E24.

Interesting. I had expected it to encrypt everything. Including that NINJADOGE24 in the end. Looks like a substitution cipher. What if it's just XOR? Like just fuckin' XOR?

I used [http://jdejong.net/tools/bitwisecalculator.php](http://jdejong.net/tools/bitwisecalculator.php), and

    89 50 4E 47 0D 0A 1A 0A 00 00 00 0D 49
                     XOR
    8D 54 4A 43 09 0E 1E 0E 04 04 04 09 4D
                      =
    04 04 04 04 04 04 04 04 04 04 04 04 04

Wow. Did I mention that NQ Vault has a premium version, which costs $7.99 a year? I bet it uses XOR2048enhancedmode for encryption.

###Day 2

Wrote a XOR encryptor and/or decryptor. It's pretty dumb by the way.

    //xor.c

    #include <stdio.h>
    #include <stdlib.h>

    int main(int argc, char *argv[])
    {
        FILE *file_a, *file_b;
        int char_a, char_b;

        file_a = fopen(argv[1], "r");
        file_b = fopen(argv[2], "r");

        while((char_a = getc(file_a)) != EOF && (char_b = getc(file_b)) != EOF)
            putchar(char_a ^ char_b);

        fclose(file_a);
        fclose(file_b);

        return EXIT_SUCCESS;
    }

Used a 1x1px jpg file this time:

    0000000: ffd8 ffe0 0010 4a46 4946 0001 0101 0060  ......JFIF.....`
    0000010: 0060 0000 ffe1 0352 4578 6966 0000 4d4d  .`.....RExif..MM
    0000020: 002a 0000 0008 0005 5100 0004 0000 0001  .*......Q.......
    0000030: 0000 0000 5101 0003 0000 0001 0001 0000  ....Q...........
    0000040: 5102 0001 0000 0300 0000 004a 5103 0001  Q..........JQ...
    0000050: 0000 0001 0000 0000 5104 0001 0000 0001  ........Q.......
    0000060: fc00 0000 0000 0000 0000 0000 0033 0000  .............3..
    0000070: 6600 0099 0000 cc00 00ff 002b 0000 2b33  f..........+..+3
    0000080: 002b 6600 2b99 002b cc00 2bff 0055 0000  .+f.+..+..+..U..
    0000090: 5533 0055 6600 5599 0055 cc00 55ff 0080  U3.Uf.U..U..U...
    00000a0: 0000 8033 0080 6600 8099 0080 cc00 80ff  ...3..f.........
    00000b0: 00aa 0000 aa33 00aa 6600 aa99 00aa cc00  .....3..f.......
                         -- snip --
    0000590: bac2 c3c4 c5c6 c7c8 c9ca d2d3 d4d5 d6d7  ................
    00005a0: d8d9 dae2 e3e4 e5e6 e7e8 e9ea f2f3 f4f5  ................
    00005b0: f6f7 f8f9 faff da00 0c03 0100 0211 0311  ................
    00005c0: 003f 00f9 1e8a 28af cdcf f7b0 ffd9 4e49  .?....(.......NI
    00005d0: 4e4a 4144 4f47 4532 3420 0d0a            NJADOGE24 ..

"Encrypted" with `4815162342`:

    0000000: 3314 332c ccdc 868a 858a cccd cdcd ccac  3.3,............
    0000010: ccac cccc 332d cf9e 89b4 a5aa cccc 8181  ....3-..........
    0000020: cce6 cccc ccc4 ccc9 9dcc ccc8 cccc cccd  ................
    0000030: cccc cccc 9dcd cccf cccc cccd cccd cccc  ................
    0000040: 9dce cccd cccc cfcc cccc cc86 9dcf cccd  ................
    0000050: cccc cccd cccc cccc 9dc8 cccd cccc cccd  ................
    0000060: 30cc cccc cccc cccc cccc cccc ccff cccc  0...............
    0000070: aacc cc55 cccc 00cc cc33 cce7 cccc e7ff  ...U.....3......
    0000080: 002b 6600 2b99 002b cc00 2bff 0055 0000  .+f.+..+..+..U..
    0000090: 5533 0055 6600 5599 0055 cc00 55ff 0080  U3.Uf.U..U..U...
    00000a0: 0000 8033 0080 6600 8099 0080 cc00 80ff  ...3..f.........
    00000b0: 00aa 0000 aa33 00aa 6600 aa99 00aa cc00  .....3..f.......
                         -- snip --
    0000590: bac2 c3c4 c5c6 c7c8 c9ca d2d3 d4d5 d6d7  ................
    00005a0: d8d9 dae2 e3e4 e5e6 e7e8 e9ea f2f3 f4f5  ................
    00005b0: f6f7 f8f9 faff da00 0c03 0100 0211 0311  ................
    00005c0: 003f 00f9 1e8a 28af cdcf f7b0 ffd9 4e49  .?....(.......NI
    00005d0: 4e4a 4144 4f47 4532 3420 0d0a            NJADOGE24 ..

Key:

    0000000: cccc cccc cccc cccc cccc cccc cccc cccc  ................
    0000010: cccc cccc cccc cccc cccc cccc cccc cccc  ................
    0000020: cccc cccc cccc cccc cccc cccc cccc cccc  ................
    0000030: cccc cccc cccc cccc cccc cccc cccc cccc  ................
    0000040: cccc cccc cccc cccc cccc cccc cccc cccc  ................
    0000050: cccc cccc cccc cccc cccc cccc cccc cccc  ................
    0000060: cccc cccc cccc cccc cccc cccc cccc cccc  ................
    0000070: cccc cccc cccc cccc cccc cccc cccc cccc  ................
    0000080: 0000 0000 0000 0000 0000 0000 0000 0000  ................
    0000090: 0000 0000 0000 0000 0000 0000 0000 0000  ................
    00000a0: 0000 0000 0000 0000 0000 0000 0000 0000  ................
    00000b0: 0000 0000 0000 0000 0000 0000 0000 0000  ................
                         -- snip --
    0000590: 0000 0000 0000 0000 0000 0000 0000 0000  ................
    00005a0: 0000 0000 0000 0000 0000 0000 0000 0000  ................
    00005b0: 0000 0000 0000 0000 0000 0000 0000 0000  ................
    00005c0: 0000 0000 0000 0000 0000 0000 0000 0000  ................
    00005d0: 0000 0000 0000 0000 0000 0000 0a         .............

Everything after the first 128 bytes remains untouched [so this is why the entire file wasn't encrypted earlier]. Wew lad. Best encryption method ever. 11/10.

Messed around using passwords like `000`, `001`, `002`... to see if there was a pattern.

      password | key
     ----------|-----
           000 | 30
           001 | 31
           002 | 32
           003 | 33
           004 | 34
              ...
           010 | 4f
           011 | 50
           012 | 21
              ...
          2424 | 04
    4815162342 | cc

Well, that started out interesting because the hex code is 30 for the character '0', 31 for '1', 31 for '2'... but it kinda stops making sense after '9'.

Anyways, there is no point in trying to re-create the generateKey(password) method - I guess I will just have to brute-force keys from 00 to ff [i.e. from 0 to 255] till I get a valid file.

###Day 3

Improvised my XOR encryptor and/or decryptor. Now it only XOR's the first 128 bytes of the file with a single byte.

    // vault-crack.c

    #include <stdio.h>
    #include <stdlib.h>

    int main(int argc, char *argv[])
    {
        FILE *file_a;
        int char_a, char_b = strtol(argv[2], NULL, 10), i = 0;

        file_a = fopen(argv[1], "r");

        while((char_a = getc(file_a)) != EOF)
        {
            if(i < 128) putchar(char_a ^ char_b) && i++;
            else putchar(char_a);
        }

        fclose(file_a);

        return EXIT_SUCCESS;
    }

Brute-forcing ain't that hard.

    #!/bin/sh
    for i in `seq 0 255`; do
        ./vault-crack $1 $i > $1.decrypted
        if [ `file $1.decrypted --brief --mime-type` != "application/octet-stream" ]
        then
            echo "Key = $i" && exit
        fi
    done

Compile `vault-crack.c` and put it in a directory along with the script and an encrypted file from the vault. Then you can run `./vault-crack.sh ENCRYPTED_FILE` to get your decrypted file.

There you go! That was fun.
