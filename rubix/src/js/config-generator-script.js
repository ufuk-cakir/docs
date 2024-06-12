function generateConfig() {
    const config = {
        "pipeline": {"name": document.getElementById('pipelineName').value},
        "logger": {
            "log_level": document.getElementById('logLevel').value,
            "log_file_path": null,
            "format": "%(asctime)s - %(name)s - %(levellevel)s - %(message)s"
        },
        "data": {
            "output_path": `${window.location.href}output`,
            "save_name": "tng_14",
            "subset": {
                "use_subset": true,
                "subset_size": 10
            },
            "simulation": {
                "name": document.getElementById('simulationName').value,
                "args": {
                    "api_key": "YOUR_API_KEY",
                    "particle_type": ["stars"],
                    "simulation": "TNG50-1",
                    "snapshot": 99,
                    "galaxy_id": 14,
                    "reuse": true
                }
            }
        },
        "telescope": {
            "name": document.getElementById('telescopeName').value,
            "psf": {"name": "gaussian", "size": 5, "sigma": 0.6},
            "lsf": {"sigma": 0.5},
            "noise": {"signal_to_noise": 1, "noise_distribution": "normal"}
        },
        "cosmology": {"name": document.getElementById('cosmologyName').value},
        "galaxy": {"dist_z": 0.1, "rotation": {"type": document.getElementById('rotationType').value}},
        "ssp": {"template": {"name": document.getElementById('sspTemplateName').value}}
    };

    const yamlConfig = jsyaml.dump(config);

    document.getElementById('configOutput').textContent = JSON.stringify(config, null, 2);
    document.getElementById('copyConfig').style.display = 'block';
    document.getElementById('downloadYaml').style.display = 'block';

    window.generatedYaml = yamlConfig;
    window.generatedConfig = config;
}

function copyConfig() {
    const config = JSON.stringify(window.generatedConfig, null, 2);
    navigator.clipboard.writeText(config).then(() => {
        alert('Configuration copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

function downloadYAML() {
    const blob = new Blob([window.generatedYaml], {type: "text/yaml"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'config.yaml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

document.addEventListener("DOMContentLoaded", function() {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/js-yaml/3.13.1/js-yaml.min.js';
    document.head.appendChild(script);
});
