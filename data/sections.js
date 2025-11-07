const SECTIONS = [
    {
        key: "Visibilidad y estado del sistema",
        title: "Visibilidad y estado del sistema",
        description: "Datos del proyecto",
        questions: [
            {
                es: "¿La aplicación incluye de forma visible el título de la página, de la sección o del sitio?",
                en: "Does the application include a visible title page, section or site?",
            },
            {
                es: "¿El usuario sabe en todo momento dónde está?",
                en: "Does the user always know where it is located?",
            },
            {
                es: "¿El usuario sabe en todo momento qué está haciendo el sistema o aplicación?",
                en: "Does the user always know what the system or application is doing?",
            },
            {
                es: "¿Los enlaces están claramente definidos?",
                en: "Are the links clearly defined?",
            },
            {
                es: "¿Todas las acciones pueden verse directamente? (Sin requerir acciones adicionales)",
                en: "Can all actions be visualized directly? (No other actions are required)",
            },
        ],
    },
    {
        key: "Connexión entre el sistema y el mundo real, uso de metáforas y objetos humanos",
        title:
            "Connexión entre el sistema y el mundo real, uso de metáforas y objetos humanos",
        description: "Equipo y herramientas",
        questions: [
            {
                es: "¿La información aparece en un orden lógico para el usuario?",
                en: "Does information appear in a logical order for the user?",
            },
            {
                es: "¿El diseño de los iconos se corresponde con objetos cotidianos?",
                en: "Does the design of the icons correspond to everyday objects?",
            },
            {
                es: "¿Cada icono realiza la acción que el usuario espera?",
                en: "Does every icon do the action that you expect?",
            },
            {
                es: "¿Se utilizan frases y conceptos familiares para el usuario?",
                en: "Does the system use phrases and concepts familiar to the user?",
            },
        ],
    },
    {
        key: "Control y libertad del usuario",
        title: "Control y libertad del usuario",
        description: "Pruebas y validaciones",
        questions: [
            {
                es: "¿Existe un vínculo para volver al estado inicial o a la página de inicio?",
                en: "Is there a link to come back to initial state or homepage?",
            },
            {
                es: "¿Existen funcionalidades para 'deshacer' y 'rehacer'?",
                en: "Are the functions 'undo' and 'redo' implemented?",
            },
            {
                es: "¿Es fácil volver a un estado anterior de la aplicación?",
                en: "Is it easy to come back to an earlier state of the application?",
            },
        ],
    },
    {
        key: "Consistencia y estándares",
        title: "Consistencia y estándares",
        description: "Pruebas y validaciones",
        questions: [
            {
                es: "¿Las etiquetas de los vínculos tienen los mismos nombres que sus destinos?",
                en: "Do link labels have the same names as their destinations?",
            },
            {
                es: "¿Las mismas acciones siempre conducen a los mismos resultados?",
                en: "Do the same actions always have the same results?",
            },
            {
                es: "¿Un mismo icono tiene el mismo significado en todo el sistema?",
                en: "Do the icons have the same meaning everywhere?",
            },
            {
                es: "¿La información se muestra de forma consistente en todo el sistema?",
                en: "Is the information displayed consistently on every page?",
            },
            {
                es: "¿Los colores de los enlaces son los estándares o, si no, adecuados para su uso?",
                en: "Are the colours of the links standard? If not, are they suitable for its use?",
            },
            {
                es: "¿Los elementos de navegación siguen los estándares? (botones, check box, ...)",
                en: "Do navigation elements follow the standards? (Buttons, check box, ...)",
            },
        ],
    },
    {
        key: "Reconocimiento en lugar de memoria, aprendizaje y anticipación",
        title: "Reconocimiento en lugar de memoria, aprendizaje y anticipación",
        description: "Pruebas y validaciones",
        questions: [
            {
                es: "¿Es sencillo de utilizar por vez primera?",
                en: "Is it easy to use the system for the first time?",
            },
            {
                es: "¿Es fácil localizar información que ya ha sido buscada con anterioridad?",
                en: "Is it easy to locate information that has already been searched for before?",
            },
            {
                es: "¿En todo momento puedes utilizar el sistema sin necesidad de recordar pantallas anteriores?",
                en: "Can you use the system at all times without remembering previous screens?",
            },
            {
                es: "¿Todo el contenido necesario para la navegación o para las diferentes tareas está en la 'pantalla actual'?",
                en: "Is all content needed for navigation or task found in the 'current screen'?",
            },
            {
                es: "¿La información está organizada según la lógica familiar de los usuarios tipo?",
                en: "Is the information organized according to logic familiar to the end user?",
            },
        ],
    },
    {
        key: "Flexibilidad y eficiencia de uso",
        title: "Flexibilidad y eficiencia de uso",
        description: "Pruebas y validaciones",
        questions: [
            {
                es: "¿Existen atajos del teclado para las acciones frecuentes?",
                en: "Are there keyboard shortcuts for common actions?",
            },
            {
                es: "Si existen, ¿queda claro cómo usarlas?",
                en: "If there are, is it clear how to use them?",
            },
            {
                es: "¿Es posible realizar de manera sencilla una acción realizada anteriormente?",
                en: "Is it possible to easily perform an action done earlier?",
            },
            {
                es: "¿El diseño se adapta al cambiar la resolución de la pantalla?",
                en: "Does the design adapt to the changes of screen resolution?",
            },
            {
                es: "¿Es visible el uso de aceleradores para el usuario habitual?",
                en: "Is the use of accelerators visible to the normal user?",
            },
            {
                es: "¿Se mantiene siempre ocupado al usuario? (sin tiempos de espera innecesarios)",
                en: "Does it always keep the user busy? (without unnecessary delays)",
            },
        ],
    },

    {
        key: "Diagnosticar errores",
        title: "Diagnosticar errores",
        description: "Pruebas y validaciones",
        questions: [
            {
                es: "¿Se muestra un mensaje antes de tomar acciones irreversibles?",
                en: "Does it display a message before taking irreversible actions?",
            },
            {
                es: "¿Los errores cometidos se muestran en tiempo real?",
                en: "Are errors shown in real time?",
            },
            {
                es: "¿El mensaje de error que aparece es fácilmente interpretable?",
                en: "Is the error message that appears easily interpretable?",
            },
            {
                es: "¿Se usa, además, algún código para referenciar el error?",
                en: "Is some code also used to reference the error?",
            },
        ],
    },
    {
        key: "Prevención de errores",
        title: "Prevención de errores",
        description: "Pruebas y validaciones",
        questions: [
            {
                es: "¿Aparece un mensaje de confirmación antes de realizar las acciones?",
                en: "Does a confirmation message appear before taking the action?",
            },
            {
                es: "¿Queda claro qué hay que introducir en cada campo de un formulario?",
                en: "Is it clear what information needs to be entered in each box on a form?",
            },
            {
                es: "¿El motor de búsqueda tolera errores tipográficos y ortográficos?",
                en: "Does the search engine tolerate typos and spelling errors?",
            },
        ],
    },
    {
        key: "Diseño estético y minimalista",
        title: "Diseño estético y minimalista",
        description: "Pruebas y validaciones",
        questions: [
            {
                es: "¿Se ha usado un diseño sin redundáncia de información?",
                en: "Is used a design without redundancy of information?",
            },
            {
                es: "¿La información es corta, concisa y precisa?",
                en: "Is the information short, concise and accurate?",
            },
            {
                es: "¿Cada elemento de información se diferencia del resto y no se confunde?",
                en: "Is each item of information different from the rest and not confused?",
            },
            {
                es: "¿El texto está bien organizado, con frases cortas y de intrepretación rápida?",
                en: "Is the text well organized, with short sentences and quick to interpret?",
            },
        ],
    },
    {
        key: "Ayuda y documentación",
        title: "Ayuda y documentación",
        description: "Pruebas y validaciones",
        questions: [
            {
                es: "¿Existe la opción 'ayuda'?",
                en: "Is there the 'help' option?",
            },
            {
                es: "¿En el caso de existir, es visible y de fácil acceso?",
                en: "If so, is it visible and easy to access?",
            },
            {
                es: "¿La ayuda está orientada a la solución de problemas?",
                en: "Is the help section aimed at solving problems?",
            },
            {
                es: "¿Dispone de un apartado de preguntas frecuentes?",
                en: "Is there a section of frequently asked questions (FAQ)?",
            },
            {
                es: "¿La documentación de ayuda es clara, utiliza ejemplos?",
                en: "Is the help documentation clear, with examples?",
            },
        ],
    },
    {
        key: "Guardar el estado y proteger el trabajo",
        title: "Guardar el estado y proteger el trabajo",
        description: "Pruebas y validaciones",
        questions: [
            {
                es: "¿Los usuarios pueden continuar desde un estado anterior al que quedaron en otro momento o desde otro dispositivo?",
                en: "Can users continue from a previous state (where they had previously been or from another device)?",
            },
            {
                es: "¿Se implementa la utilidad de 'auto-guardado'?",
                en: "Is 'Autosave' implemented?",
            },
            {
                es: "¿Tiene buena respuesta a fallos ajenos? (cortes de corriente, de internet,…)",
                en: "Does the system have a good response to external failures? (Power cut, internet not working, ...)",
            },
        ],
    },
    {
        key: "Color y legibilidad",
        title: "Color y legibilidad",
        description: "Pruebas y validaciones",
        questions: [
            {
                es: "¿Las fuentes del texto tienen un tamaño adecuado?",
                en: "Do the fonts have an adequate size?",
            },
            {
                es: "¿Las fuentes del texto utilizan colores con suficiente contraste con el fondo?",
                en: "Do the fonts use colours with sufficient contrast with the background?",
            },
            {
                es: "¿Las imágenes o patrones del fondo no impiden la lectura del contenido?",
                en: "Do background images or patterns allow the content to be read?",
            },
            {
                es: "¿Se tiene en cuenta a los usuarios con visión reducida?",
                en: "Does it consider people with reduced vision?",
            },
        ],
    },
    {
        key: "Autonomía",
        title: "Autonomía",
        description: "Pruebas y validaciones",
        questions: [
            {
                es: "¿Se mantiene en todo momento informado al usuario del estado del sistema?",
                en: "Does it keep the user informed of system status?",
            },
            {
                es: "¿Además, el estado del sistema es visible y actualizado?",
                en: "Moreover, is the system status visible and updated?",
            },
            {
                es: "¿El usuario puede tomar sus propias decisiones? (Personalización)",
                en: "Can the user take their own decisions? (Personalization)",
            },
        ],
    },
    {
        key: "Valores por defecto",
        title: "Valores por defecto",
        description: "Pruebas y validaciones",
        questions: [
            {
                es: "¿El sistema o aparato proporciona la opción de volver a los valores de fábrica?",
                en: "Does the system or device give the option to return to factory settings?",
            },
            {
                es: "¿Si es así, se indica claramente las consecuencias de dicha acción?",
                en: "If so, does it clearly indicate the consequences of the action?",
            },
            {
                es: "¿Se utiliza el término “por defecto”?",
                en: "Is the term 'Default' used?",
            },
        ],
    },
    {
        key: "Reducción de la latencia",
        title: "Reducción de la latencia",
        description: "Pruebas y validaciones",
        questions: [
            {
                es: "¿La ejecución de tareas pesadas es transparente al usuario?",
                en: "Is the execution of heavy work transparent to the user?",
            },
            {
                es: "¿Se muestra el tiempo restante o alguna animación de las tareas pesadas que se están ejecutando?",
                en: "While running heavy tasks, is remaining time or some animation shown?",
            },
        ],
    },
];
export default SECTIONS;
