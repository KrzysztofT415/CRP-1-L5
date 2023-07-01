## Wymagania

```bash
npx --version #8.3.1
npx ts-node --version #v10.7.0
npm modules:
    chalk, prompt, big-integer, crypto
```

## Pliki

`main.ts` - plik uruchamiający prompt do komunikacji, zawiera logikę w komunikacji Alice i Boba

`config.ts` - plik konfiguracyjny prompt'u

`speke.ts` - plik zawierający implementację Speke

`test1.ts` - test połączenia Alice-Bob

`test2.ts` - test ustalania klucza w Speke

`test3.ts` - testy wstępnego działania aes-256-cbc, implementacji Speke oraz parsowania

`tsconfig.json` - plik konfiguracyjny kompilatora typescript'u

## Użycie

```bash
npx ts-node main.ts #uruchomienie programu [argumenty są podawane wewnątrz]
npx ts-node test$1.ts #uruchomienie testów, $1 z {1,2,3}
```
