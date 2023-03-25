def calculadora():
    while True:

        # Obtenha os dois números e a operção  a ser realizada pelo usuário
        num1 = float(input("Digite o primeiro número: "))
        num2 = float(input("Digite o segundo número: "))
        op = input("Digite a operação desejada (+, -, *, /): ")

        # Realiza a operação de acordo com a escolha do usuário
        if op == "+":
            resultado = num1 + num2
        elif op == "-":
            resultado = num1 - num2
        elif op == "*":
            resultado = num1 * num2
        elif op == "/":
            resultado = num1 / num2

        # Exibe resultado na tela
        print(f"O resultado de {num1} {op} {num2} é {resultado}.")

        #Pergunta ao usuário se ele deseja contiuar usando a calculadora? (s/n)
        continuar = input("Deseja continuar usando a calculadora? (s/n): ")

        if continuar.lower() == "s":
            continue
        else:
            break

#Chame a função para executar a calculadora
calculadora()